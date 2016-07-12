'use strict';

angular.module('App')
    .controller('NewBillController',['$scope','patientFactory','billFactory', '$stateParams','choosePatientFactory','authorize','backendFactory', function($scope,patientFactory,billFactory, $stateParams, choosePatientFactory, authorize,backendFactory){
    // auto fill panel/cash     
    // add discount autofill from db and editable input box
    // add other fields to display on top   
        patientFactory.getPatients(authorize.getCentre()).get({id:choosePatientFactory.getChosenPatient().id}).$promise.then(function(response){
            $scope.patient = response;
        });
        var cost = 200; // default prize ... later fetch from cost sheet;
        $scope.bill = {
            id:'',
            bedType:"",
            transactionType:"",
            ledger:"",
            quantity:1,
            discount:"",
            status:"Pending",
            amount:cost,
            lastModifiedBy:"",
            patientId: null,
            saved: false
        };
        $scope.$watch('patient.id',function(newValue,oldValue){
            $scope.bill.patientId = newValue;
            console.log(newValue+"Yyyyy");
        })

        $scope.panelSelected = false;
        backendFactory.getPanels().query(function(response){
            $scope.panels = response;    
        });
        backendFactory.getTransactionTypes().query(function(response){
            $scope.transactionTypes = response;    
        });
         
        $scope.show = false;
        $scope.basicSelectionComplete = false;
        $scope.bedSelected = false;
        $scope.totalAmount = 0;     
        $scope.dropDown=[];   
        var dialysisTypes = [];
        var procedureTypes = [];
        var pharmacyTypes = [];
        var consumableTypes = [];
        backendFactory.getDialysisTypes().query(function(response){
            for (var i = 0;i<response.length;i++)
                dialysisTypes.push({type:response[i].dialysisType});    
            });
        backendFactory.getProcedureTypes().query(function(response){
                for (var i = 0;i<response.length;i++)
                    procedureTypes.push({type:response[i].procedureType});    
            });
        backendFactory.getPharmacyTypes().query(function(response){
                for (var i = 0;i<response.length;i++)
                    pharmacyTypes.push({type:response[i].pharmacyType});    
            });
        backendFactory.getConsumableTypes().query(function(response){
                for (var i = 0;i<response.length;i++)
                    consumableTypes.push({type:response[i].consumableType});    
            });
        $scope.changeState = function(i){
            if(i == 1 && $scope.bill.bedType !== "") $scope.bedSelected = true;
            if(i == 2 ){
                if($scope.modeOfPayment === "cashless"){
                    $scope.panelSelected = true;
                    $scope.basicSelectionComplete = false;
                }else if($scope.modeOfPayment === "cash") {
                    $scope.basicSelectionComplete = true;
                    $scope.panelSelected = false;
                }
            }
            if(i == 3 && $scope.panel !== "" && $scope.panelSelected) $scope.basicSelectionComplete = true;
            if(i == 4 && $scope.bill.transactionType !== ""){
                $scope.show= true;
                // $scope.dropDown = [];
                switch($scope.bill.transactionType){
                    case "Dialysis":$scope.dropDown = dialysisTypes;
                                    break;
                    case "Procedure":$scope.dropDown = procedureTypes;
                                    break;
                    case "Pharmacy":$scope.dropDown = pharmacyTypes;
                                    break;
                    case "Consumable":$scope.dropDown = consumableTypes;
                                    break;
                }
            }
        };
        $scope.bill.quantity = 1 ;
        $scope.bill.amount = cost;
        $scope.updateAmount = function(){
            $scope.bill.amount = $scope.bill.quantity * cost;
        };
        $scope.bills = [];
        var trId = 0; // fetch from db
        var pendingTransactions = false;
        $scope.makePayment = function(status){
            pendingTransactions = false;
            $scope.bill.id = trId++;
            $scope.bill.patientId = $scope.patient.id;
            // $scope.bill.status = status;
            $scope.bill.lastModifiedBy = authorize.getUsername();

            if($scope.bill.transactionType !== ""){
                $scope.totalAmount += $scope.bill.amount;
                $scope.bills.push($scope.bill);
            }
            console.log($scope.bill);
            for(var i = 0 ; i< $scope.bills.length; i++){
                if(!$scope.bills[i].saved){
                    $scope.bills[i].status = status;
                    $scope.bills[i].saved = true;
                    billFactory.getBills(authorize.getCentre()).save($scope.bills[i]);
                }
            }

            // for (var i = $scope.bills.length - 1; i >= 0; i--) {
            //     $scope.bills[i].paid = true;
            // }
            $scope.bill = {
                id:'',
                bedType:"",
                transactionType:"",
                ledger:"",
                quantity:1,
                discount:"",
                status:"Pending",
                amount:cost,
                lastModifiedBy:"",
                patientId: $scope.patient.id,
                saved: false

            };


            $scope.billingForm.$setPristine();
            $scope.panelSelected = false;
            $scope.show = false;
            $scope.basicSelectionComplete = false;
            $scope.bedSelected = false;
            $scope.modeOfPayment = "";
            $scope.bed = "";
            // $scope.bills = [];

        };

        $scope.check = function(){
            // console.log($scope.bill.transactionType + " " + $scope.bills.length);
            // 
            if(!pendingTransactions) return false;
            else {
                    if($scope.bill.transactionType === "") return true;
                    else return false;      
                }
        };
        $scope.removeEntry = function(id){
            for (var i = $scope.bills.length - 1; i >= 0; i--) {
                if($scope.bills[i].id == id)
                    $scope.bills.splice(i,1);
            }
        };
        $scope.add = function(){
            pendingTransactions = true;
            $scope.bill.id = trId++;
            $scope.bill.patientId = $scope.patient.id;
            $scope.totalAmount += $scope.bill.amount;
            $scope.bills.push($scope.bill);
            $scope.bill = {
                id:'',
                bedType:"",
                transactionType:"",
                ledger:"",
                quantity:1,
                discount:"",
                status:"Pending",
                amount:cost,
                lastModifiedBy:"",
                patientId: $scope.patient.id,
                saved: false

            };
            $scope.billingForm.$setPristine();
            $scope.panelSelected = false;
            $scope.show = false;
            $scope.basicSelectionComplete = false;
            $scope.bedSelected = false;
            $scope.modeOfPayment = "";
            $scope.bed = "";
        };

    }])    
    .controller('BillingHomeController',['$scope', function($scope){

    }])
    
;