'use strict';
angular.module('App')
    .controller('ViewBillController',['$scope','billFactory','patientFactory','$state', function($scope, billFactory, patientFactory,$state){
        $scope.bills = {};
        billFactory.getBills().query(function(response){
            $scope.bills = response;
        });
        $scope.redirect = function(id){
        	$state.go("app.billing.viewbill.details",{id:id});
        };
    }])
;