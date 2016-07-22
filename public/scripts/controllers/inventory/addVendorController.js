'use strict';
angular.module('App')
.controller('AddVendorController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
	
	$scope.showalert_add_vendor=false;
		
		$scope.addVendor= {
			vendorName:null,
			vendorAddress:null,	
			vendorTINNumber:null,
			vendorContactPerson:null,
			vendorContactPersonNumber:null,
			vendorIndroducedBy:null,
			vendorIntroducedByName:null,
			
		};
		
		
		$scope.saveVendor = function(){
			
		 inventoryFactory.getVendors().save($scope.addVendor).$promise.then(function(response){

				console.log($scope.addVendor);

				$scope.addVendorForm.$setPristine();
				$scope.addVendor= {
					vendorName:null,
					vendorAddress:null,
					vendorTINNumber:null,
					vendorContactPerson:null,
					vendorContactPersonNumber:null,
					vendorIndroducedBy:null,
					vendorIntroducedByName:null,
					
				};
				$scope.showalert_add_vendor=true;
		})
		
		
		}
	}])
;