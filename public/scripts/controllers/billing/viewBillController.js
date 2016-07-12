'use strict';
angular.module('App')
    .controller('ViewBillController',['$scope','billFactory','patientFactory','$state','authorize', function($scope, billFactory, patientFactory,$state,authorize){
        $scope.bills = [];
        billFactory.getBills(authorize.getCentre()).query(function(response){
            $scope.bills = response;
        });
        $scope.redirect = function(id){
        	$state.go("app.billing.viewbill.details",{id:id});
        };
    }])
;