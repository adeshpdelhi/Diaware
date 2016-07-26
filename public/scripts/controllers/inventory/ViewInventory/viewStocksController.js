'use strict';
angular.module('App')
.controller('ViewStocksController',['$scope','authorize','inventoryFactory', function($scope,authorize, inventoryFactory){
	
		inventoryFactory.getStocks(authorize.getCentre()).query().$promise.then(function(response){
			$scope.stocks = response;
		},function(response){
			alert('stock retrieval failed');
		});
		
		
	
	}])
;