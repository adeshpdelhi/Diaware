'use strict';
angular.module('App')
.controller('ViewBillDetailsController',['$scope' ,'bill' ,function ($scope,bill) {
		$scope.bill = bill;
		$scope.updateStatus = function(){
			billFactory.getBills().update({id:bill.transactionId},{status:'Paid'});
		};

}])
;