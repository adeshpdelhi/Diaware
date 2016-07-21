'use strict';
angular.module('App')
.controller('AddVendorController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
	
	$scope.showalert_add_vendor=false;
		
		$scope.addVendor= {
			vendorId:null,
			vendorName:null,
			vendorAddress:null,
			vendorTINNo:null,
			vendorContactPerson:null,
			vendorContactPersonNumber:null,
			vendorIndroducedBy:null,
			vendorIntroducedByName:null,
			saved:false
		};
		

		
		
		$scope.saveVendor = function(){
			
		 inventoryFactory.getVendors().save($scope.addVendor).$promise.then(function(response){

				console.log($scope.addVendor);

				$scope.addVendorForm.$setPristine();
				$scope.addVendor= {
					vendorId:null,
					vendorName:null,
					vendorAddress:null,
					vendorTINNo:null,
					vendorContactPerson:null,
					vendorContactPersonNumber:null,
					vendorIndroducedBy:null,
					vendorIntroducedByName:null,
					saved:false
				};
				$scope.showalert_add_vendor=true;
		})
		
		
		}
	}])
;