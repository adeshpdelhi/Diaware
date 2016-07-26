'use strict';
angular.module('App')
.controller('ItemsController',['$scope','inventoryFactory','authorize',function($scope,inventoryFactory,authorize){
	$scope.items = [];
	$scope.savedOnce = false;
	$scope.item ={
		id:null,
		itemName:null,
		usageType:null,
		brandName:null,
		quantityMeasurementType:null,
		lastModifiedBy:null
	};	
	$scope.showAlert = false;
	$scope.addItem = function(){
		console.log($scope.item);
		$scope.item.lastModifiedBy = authorize.getUsername();
		$scope.items.push($scope.item);
		$scope.item ={
			id:null,
			itemName:null,
			usageType:null,
			brandName:null,
			quantityMeasurementType:null,
			lastModifiedBy:null
		};	
	};
	$scope.removeItem = function(index){
		$scope.items.splice(index,1);
	};
	$scope.setPristine = function(){
		$scope.item ={
			id:null,
			itemName:null,
			usageType:null,
			brandName:null,
			quantityMeasurementType:null,
			lastModifiedBy:null
		};
		$scope.itemForm.$setPristine();
	};
	$scope.saveItems = function(){
		console.log($scope.items);
		inventoryFactory.getItems().save($scope.items).$promise.then(function(response){
			console.log(response.result);
			$scope.messageColor = 'success';
			$scope.showAlert = true;
			$scope.message = "Items Saved Successfully!";
			$scope.savedOnce = true;
		},function(response){
			$scope.messageColor = 'danger';
			$scope.showAlert = true;
			$scope.message = "Error: " + response.status + ' ' + response.statusText + "!"; 
		});
	};

}]);