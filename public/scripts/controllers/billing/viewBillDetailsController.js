'use strict';
angular.module('App')
.controller('ViewBillDetailsController',['$scope','$stateParams','billFactory' ,'bill' ,function ($scope,$stateParams,billFactory,bill) {
		$scope.bill = bill;
		// console.log(parseInt($stateParams.id,10));
		// $scope.bill = billFactory.getBill(parseInt($stateParams.id,10));
		// console.log($scope.bill);
		$scope.updateStatus = function(){
			billFactory.getBills().update({id:bill.transactionId},{status:'Paid'});
		};

}])
;