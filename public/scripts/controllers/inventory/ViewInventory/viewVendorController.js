'use strict';
angular.module('App')
.controller('ViewVendorController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
	
		inventoryFactory.getVendors().query().$promise.then(function(response){
	      $scope.vendors = response;
	      console.log(response);
	    });
		
		$scope.saveVendor = function(){
		
		
		}
	}])
;