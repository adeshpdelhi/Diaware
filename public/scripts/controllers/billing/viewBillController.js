'use strict';
angular.module('App')
    .controller('ViewBillController',['$scope','billFactory','patientFactory', function($scope, billFactory, patientFactory){
        $scope.billsJoinedPatients = billFactory.getBills();
        console.log($scope.billsJoinedPatients[0]);
        var patients = patientFactory.getPatients();
        for (var i = $scope.billsJoinedPatients.length - 1; i >= 0; i--) {
            for (var j = patients.length - 1; j >= 0; j--) {
                if(patients[j].patientId == $scope.billsJoinedPatients[i].patientId)
                    $scope.billsJoinedPatients[i].patient = patients[i];
            }
        }
        $scope.redirect = function(){
            // add code to redirect to bill details page
        };
    }])
;