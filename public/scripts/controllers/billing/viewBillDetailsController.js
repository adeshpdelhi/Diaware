'use strict';
angular.module('App')
.controller('ViewBillDetailsController',['$scope' ,'bill','billFactory','authorize',function ($scope,bill,billFactory, authorize) {
		$scope.bill = bill;
		$scope.updateStatus = function(){
			$scope.bill.status="Paid";
			billFactory.getBills(authorize.getCentre()).update({billId:bill.billId},{
				status:'FullPaid',
				amountPending:0
			}).$promise.then(function(response){
				$scope.alert = true;
				$scope.message =" Updated successfully!";
				$scope.messageColor = 'success';
			},function (response) {
				$scope.alert = true;
				$scope.message =" Error: "+response.status+ " " + response.statusText+ "!";
				$scope.messageColor = 'danger';
			});
		};
		$scope.isCancellable = function () {
			var date = new Date(bill.createdAt);
			date.setHours(0,0,0,0,0);
			var today = new Date();
			today.setHours(0,0,0,0,0);
			if(today - date > 2*24*60*60*1000)
				return false;
			else true;
		};
		$scope.cancelBill = function () {
			billFactory.getBills(authorize.getCentre()).delete({billId:bill.billId})
			.then(function(response) {
				$scope.alert = true;
				$scope.message =" Cancelled The bill successfully!";
				$scope.messageColor = 'success';
			},function (response) {
				$scope.alert = true;
				$scope.message =" Error: "+response.status+ " " + response.statusText+ "!";
				$scope.messageColor = 'danger';
			});	
		};

}])
;