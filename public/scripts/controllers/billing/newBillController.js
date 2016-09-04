'use strict';

angular.module('App')
    .controller('NewBillController',['$scope','patientFactory','billFactory', '$stateParams','choosePatientFactory','authorize','backendFactory','appointmentFactory', function($scope,patientFactory,billFactory, $stateParams, choosePatientFactory, authorize,backendFactory,appointmentFactory){
    // add other fields to display on top 
        var chosenPatientId = choosePatientFactory.getChosenPatient().id;
        patientFactory.getPatients(authorize.getCentre()).get({id:chosenPatientId}).$promise.then(function(response){
            $scope.patient = response;
            $scope.bill.patientId = chosenPatientId;

        });
        var appointment = choosePatientFactory.getAppointment();
        $scope.dueBill = false;
        $scope.showBilling = true;
        if(!appointment.present){
            $scope.showBilling = false;
        }
        // backendFactory.getPanels().query(function(response){
        //     $scope.panels = response;    
        // });
        backendFactory.getTransactionTypes().query(function(response){
            $scope.transactionTypes = response;    
        });
        patientFactory.getPatientPanels(chosenPatientId,authorize.getCentre())
        .query({active:true},function(response){
            $scope.panels = response;
        });

        $scope.prevRemarks = appointment.billingRemarks;

        $scope.appoint = {
            allBillsCleared: appointment.allBillsCleared,
            billingRemarks: appointment.billingRemarks
        }

        $scope.bill = {
            // billId:null,
            appointmentId:null,
            appointmentDate:null,
            appointmentType:"",
            modeOfPayment:'',
            panelId: null,
            additionalDiscount:0,
            status:"FullPaid",
            totalAmount:0,
            payableAmount:0,
            patientPayableAmount:0,
            amountPending:0,
            lastModifiedBy:"",
            patientId: null,
            saved: false,
            subItems:[]
        };
        $scope.subItem = {
            // bill
            transactionId: null,
            transactionType:null,
            ledger:null,
            quantity:1,
            amount:null
        };

        $scope.panelSelected = false;
         
        $scope.show = false;
        $scope.basicSelectionComplete = false;
        $scope.appointmentTypeSelected = false;
       
        var trId = 1; // fetch from db

        $scope.$watch('subItem.quantity',function(newValue,oldValue){
            if($scope.cost)
                $scope.subItem.amount = $scope.subItem.quantity * $scope.cost; 
        });
        $scope.$watch('subItem.ledger',function (newValue,old) {
            console.log($scope.subItem.ledger);
            if($scope.subItem.ledger != null && $scope.subItem.ledger != '' ){
                for(var i = 0; i < $scope.ledgers.length; i++){
                    if($scope.subItem.ledger == $scope.ledgers[i].ledgerName){
                        $scope.cost = $scope.ledgers[i].cost;
                        $scope.subItem.amount = $scope.cost;
                    }
                }
            }
        });
        $scope.$watch('cost',function(newValue,oldValue){
            console.log("Cost " + $scope.cost);
        });
        $scope.changeState = function(i){
            if(i == 1 && $scope.bill.appointmentType !== "") $scope.appointmentTypeSelected = true;
        
            if(i == 2 ){
                if($scope.bill.modeOfPayment === "cashless"){
                    $scope.panelSelected = true;
                    $scope.basicSelectionComplete = false;
                }else if($scope.bill.modeOfPayment === "cash") {
                    $scope.basicSelectionComplete = true;
                    $scope.panelSelected = false;
                    $scope.panelDiscount = 0;
                }
            }
            if(i == 3 && $scope.bill.panelId !== "" && $scope.panelSelected){
                for(var i = 0; i < $scope.panels.length;i++){
                    console.log($scope.bill.panelId+" "+ $scope.panels[i].panelId);
                    if($scope.bill.panelId == $scope.panels[i].panelId){
                        $scope.panelDiscount = ($scope.panels[i].panel.discount != null)?($scope.panels[i].panel.discount/100):0; //assuming discount stored in %
                        console.log($scope.panelDiscount + "panelDiscount" + (($scope.panels[i].panel.discount != null)?($scope.panels[i].panel.discount/100):0));
                    }
                        
                }
                $scope.basicSelectionComplete = true;
            } 
            if(i == 4 && $scope.subItem.transactionType !== ""){
                $scope.show= true;
                backendFactory.getLedgers().query({ledgerType:$scope.subItem.transactionType},function(response){
                    $scope.ledgers = response;
                    $scope.cost = 0;
                });
            }
        };
        
        $scope.add = function(){
            $scope.subItem.transactionId = trId++;
            $scope.bill.totalAmount += $scope.subItem.amount;
            $scope.bill.subItems.push($scope.subItem);
            $scope.subItem = {
                // bill
                transactionId: null,
                transactionType:null,
                ledger:null,
                quantity:1,
                amount:null
            };
            // $scope.billingForm.itemForm.$setPristine();
            $scope.show = false;
        };
        $scope.payable = function(){
            if($scope.bill.subItems.length == 0 || $scope.subItem.transactionType != null)
                {
                    console.log("false");
                    return false;
                }
            else {
                console.log("true");
                return true;
            }
        };
        $scope.setPristine = function(){
            $scope.subItem = {
                // bill
                transactionId: null,
                transactionType:null,
                ledger:null,
                quantity:1,
                amount:null
            };
        };
        $scope.removeEntry = function(id){
            for (var i = $scope.bill.subItems.length - 1; i >= 0; i--) {
                if($scope.bill.subItems[i].transactionId == id){
                    $scope.bill.totalAmount = $scope.bill.totalAmount - $scope.bill.subItems[i].amount;
                    $scope.bill.subItems.splice(i,1);

                }
            }
        };
        $scope.$watch('bill.totalAmount',function(newValue,oldValue){
            if(newValue > 0){
                $scope.bill.payableAmount = $scope.bill.totalAmount - ($scope.bill.totalAmount* $scope.bill.additionalDiscount/100); 
                $scope.bill.patientPayableAmount = $scope.bill.payableAmount;
            }
        });
        /*
        */
        $scope.makePayment = function(status){
            $scope.bill.appointmentId =  appointment.appointmentId;
            $scope.bill.appointmentDate = appointment.date;
            console.log("entered makePayment");
            $scope.bill.payableAmount = $scope.bill.totalAmount - ($scope.bill.totalAmount* $scope.bill.additionalDiscount/100); 
            $scope.bill.patientPayableAmount = $scope.bill.payableAmount;
            console.log($scope.bill.modeOfPayment);
            console.log($scope.bill.amountPending);
            console.log($scope.bill.status);
            if($scope.bill.modeOfPayment === 'cashless'){
                $scope.bill.patientPayableAmount = $scope.bill.payableAmount - $scope.bill.payableAmount * $scope.panelDiscount;
                if($scope.bill.patientPayableAmount == 0)
                    $scope.bill.status = 'Pending';
                if($scope.bill.patientPayableAmount == $scope.bill.payableAmount)
                    $scope.bill.status = 'FullPaid';
                if($scope.bill.patientPayableAmount > 0 && $scope.bill.patientPayableAmount < $scope.bill.payableAmount)
                    $scope.bill.status = "PartialPaid";
                $scope.bill.amountPending = $scope.bill.payableAmount - $scope.bill.patientPayableAmount;
                console.log("amountPending: " + $scope.bill.amountPending +"; payableAmount: " + $scope.bill.payableAmount +"; patientPayableAmount: " +$scope.bill.patientPayableAmount  );
            }

            $scope.bill.patientId = $scope.patient.id;
            $scope.bill.lastModifiedBy = authorize.getUsername();
            billFactory.getBills(authorize.getCentre()).save($scope.bill).$promise.then(function (response) {
                console.log(response);
                $scope.billId = response.billId;
                $scope.message = "Successfully made Payment! TransactionId: " + $scope.billId;
                $scope.alert = true;
                $scope.messageColor = 'success';
                $scope.bill.saved = true;
            },function (response) { 
                $scope.alert = true;
                $scope.message = "Error: " + response.status+ " " + response.statusText + "!";
                $scope.messageColor = 'danger';
            });
            console.log('allBillsCleared: ');
            console.log($scope.appoint.allBillsCleared);
            console.log('billingRemarks: ');
            console.log($scope.appoint.billingRemarks);
            appointmentFactory.getAppointments(authorize.getCentre()).update(
                {appointmentId:$scope.bill.appointmentId},
                {
                    billingDone: true,
                    allBillsCleared: $scope.appoint.allBillsCleared,
                    billingRemarks: $scope.appoint.billingRemarks
                });

        };

        $scope.reinit = function(){
            $scope.bill = {
                appointmentId:null,
                appointmentDate:null,
                appointmentType:"",
                modeOfPayment:null,
                panelId: null,
                additionalDiscount:null,
                status:"Pending",
                totalAmount:0,
                payableAmount:0,
                patientPayableAmount:0,
                amountPending:0,
                lastModifiedBy:"",
                patientId: null,
                saved: false,
                subItems:[]
            };

            $scope.billingForm.$setPristine();
            $scope.panelSelected = false;
            $scope.show = false;
            $scope.basicSelectionComplete = false;
            $scope.appointmentTypeSelected = false;
            $scope.subItem = {
            // bill
                transactionId: null,
                transactionType:null,
                ledger:null,
                quantity:1,
                amount:null
            };
            trId = 1; // fetch from db
            $scope.alert = false;

        };

        
        
        

    }])    
    .controller('BillingHomeController',['$scope', function($scope){

    }])
    
;