'use strict';
angular.module('App')
.controller('ViewFloorController',['$scope','authorize','inventoryFactory', function($scope,authorize, inventoryFactory){
	
		inventoryFactory.getFloor(authorize.getCentre()).query().$promise.then(function(response){
			$scope.floor = response;
			console.log($scope.floor);
		},function(response){
			alert('Floor retrieval failed');
		})
		
		
		
	
	}])
;