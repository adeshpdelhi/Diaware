'use strict';

angular.module('App')
    .controller('NewBillController',['$scope','patientFactory','billFactory', '$stateParams','dropDownFactory','choosePatientFactory','authorize', function($scope,patientFactory,billFactory, $stateParams, dropDownFactory,choosePatientFactory, authorize){
    // auto fill panel/cash     
    // add discount autofill from db and editable input box
    // add other fields to display on top   
        $scope.patient = patientFactory.getPatients().get({id:choosePatientFactory.getChosenPatient().id});

        $scope.bill = {
            transactionId:'',
            bedType:"",
            transactionType:"",
            ledger:"",
            quantity:1,
            discount:"",
            status:"Pending",
            amount:"",
            lastModifiedBy:"",
            patientId: $scope.patient.id
        };


        $scope.panelSelected = false;
        $scope.panels = dropDownFactory.getPanels();
        $scope.transactionTypes =  dropDownFactory.getTransactionTypes();
        $scope.show = false;
        $scope.basicSelectionComplete = false;
        $scope.bedSelected = false;
        $scope.totalAmount = 0;        
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
                switch($scope.bill.transactionType){
                    case "dialysis":$scope.dropDown = dropDownFactory.getDialysis();
                                    break;
                    case "procedure":$scope.dropDown = dropDownFactory.getProcedures();
                                    break;
                    case "pharmacy":$scope.dropDown = dropDownFactory.getPharmacy();
                                    break;
                    case "consumable":$scope.dropDown = dropDownFactory.getConsumables();
                                    break;
                }
            }
        };
        var cost = 200; // default prize ... later fetch from cost sheet;
        $scope.bill.quantity = 1 ;
        
        $scope.updateAmount = function(){
            $scope.bill.amount = $scope.bill.quantity * cost;
        };
        $scope.bills = [];
        var trId = 0; // fetch from db
        var pendingTransactions = false;
        $scope.makePayment = function(status){
            pendingTransactions = false;
            $scope.bill.transactionId = trId++;
            $scope.bill.patientId = $scope.patient.id;
            $scope.bill.status = status;
            $scope.bill.lastModifiedBy = authorize.getUsername();

            if($scope.bill.transactionType !== "")
                $scope.bills.push($scope.bill);
            console.log($scope.bill);
            for(var i = 0 ; i< $scope.bills.length; i++)
                billFactory.getBills().save($scope.bills[i]);

            for (var i = $scope.bills.length - 1; i >= 0; i--) {
                $scope.bills[i].paid = true;
            }
            $scope.bill = {
                transactionId:'',
                bedType:"",
                transactionType:"",
                ledger:"",
                quantity:1,
                discount:"",
                status:"Pending",
                amount:"",
                lastModifiedBy:"",
                patientId: $scope.patient.id
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
                if($scope.bills[i].transactionId == id)
                    $scope.bills.splice(i,1);
            }
        };
        $scope.add = function(){
            pendingTransactions = true;
            $scope.bill.transactionId = trId++;
            $scope.bill.patientId = $scope.patient.patientId;
            $scope.totalAmount += $scope.bill.amount;
            $scope.bills.push($scope.bill);
            $scope.bill = {
                transactionId:'',
                transactionType:"",
                product:"",
                quantity:1,
                cost:230,
                paid: false,
                patientId: ""
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