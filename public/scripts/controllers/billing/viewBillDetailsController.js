'use strict';
angular.module('App')
.controller('ViewBillDetailsController',['$scope' ,'bill','billFactory','authorize',function ($scope,bill,billFactory, authorize) {
		$scope.bill = bill;
		$scope.updateStatus = function(){
			$scope.bill.status="Paid";
			billFactory.getBills(authorize.getCentre()).update({id:bill.transactionId},{status:'Paid'});
		};

}])
;