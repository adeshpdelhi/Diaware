'use strict';
angular.module('App')
.controller('ViewIssueStockController',['$scope','authorize','inventoryFactory','$uibModal', function($scope,authorize,inventoryFactory, $uibModal){
	
		$scope.stocksIssued = [];
		inventoryFactory.getStocksIssued(authorize.getCentre()).query().$promise.then(function(response){
			$scope.stocksIssued = response;
		},function(response){
			alert('failed to retrieve stocks issued');
		});
	
		
		$scope.openStockIssued = function(stockIssuedId){
			var modalInstance = $uibModal.open({
	          templateUrl: 'views/inventory/ViewInventory/viewStockIssuedModal.html',
	          controller: 'ViewStockIssuedModalController',
	          size:'lg' ,
	          resolve: {
	            stockIssuedId: function () {
	             return stockIssuedId;
	            }
	          }
	        });
		};
		
		
	
	}])



.controller('ViewStockIssuedModalController', ['$scope', '$state', 'authorize', '$uibModalInstance', 'stockIssuedId', 'inventoryFactory','regularForm', function ($scope, $state, authorize, $uibModalInstance, stockIssuedId, inventoryFactory, regularForm) {
	$scope.regularForm = regularForm.regularForm;
    $scope.stockIssuedId = stockIssuedId;
    inventoryFactory.getStocksIssued(authorize.getCentre()).get({stockIssuedId: $scope.stockIssuedId}).$promise.then(function(response){
    	$scope.stockIssued = response;
    	console.log($scope.stockIssued);
    },function(response){
    	alert('stock Issued retrieval failed');
    });

    inventoryFactory.getStockIssuedItems(authorize.getCentre(),$scope.stockIssuedId).query().$promise.then(function(response){
    	$scope.stockIssuedItems = response;
    },function(response){
    	alert('stock issued items retrieval failed');
    });
}])

;

