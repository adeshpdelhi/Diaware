'use strict';
angular.module('App')
.controller('ViewVendorController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
	
		inventoryFactory.getVendors().query().$promise.then(function(response){
	      $scope.vendor = response;
	      console.log(response);
	    });
		
		$scope.saveVendor = function(){
		
		
		}
	}])
;