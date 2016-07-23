'use strict';
angular.module('App')
.controller('AddVendorController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
	
	$scope.showAlert=false;
	$scope.message='';
	$scope.messageColor='';
		$scope.vendor= {
			vendorName:null,
			vendorAddress:null,	
			vendorTINNumber:null,
			vendorContactPerson:null,
			vendorContactPersonNumber:null,
			vendorIndroducedBy:null,
			vendorIntroducedByName:null,
		};
		
		
		$scope.saveVendor = function(){
			$scope.vendor.lastModifiedBy = authorize.getUsername();
		 inventoryFactory.getVendors().save($scope.vendor).$promise.then(function(response){

				console.log(response);
				$scope.vendorForm.$setPristine();
				$scope.vendor= {
					vendorName:null,
					vendorAddress:null,
					vendorTINNumber:null,
					vendorContactPerson:null,
					vendorContactPersonNumber:null,
					vendorIndroducedBy:null,
					vendorIntroducedByName:null,
				};
				$scope.showAlert=true;
				$scope.message='Saved successfully';
				$scope.messageColor='success';
		},
		function(response){
			console.log(response);
			$scope.showAlert=true;
				$scope.message='Error saving!';
				$scope.messageColor='danger';
		})
		
		
		}
	}])
;