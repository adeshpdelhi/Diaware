'use strict';
angular.module('App')
    .controller('ViewBillController',['$scope','billFactory','patientFactory','$state', function($scope, billFactory, patientFactory,$state){
        billFactory.getBills().query(function(response){
            $scope.billsJoinedPatients = response;
        });
        $scope.redirect = function(id){
            // add code to redirect to bill details page
        	$state.go("app.billing.viewbill.details");
        	// ({id:'"+id+"'})

        };
    }])
;