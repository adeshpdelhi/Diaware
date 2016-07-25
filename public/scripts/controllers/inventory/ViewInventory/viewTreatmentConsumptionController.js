'use strict';
angular.module('App')
.controller('ViewTreatmentConsumptionController',['$scope','authorize','inventoryFactory','$uibModal', function($scope,authorize,inventoryFactory, $uibModal){
	
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
		}
		
		
	
	}])