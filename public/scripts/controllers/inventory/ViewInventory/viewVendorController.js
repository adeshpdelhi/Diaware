'use strict';
angular.module('App')
.controller('AddVendorController',['$scope','authorize', function($scope,authorize){
	
	$scope.showalert_add_vendor=false;
		
		$scope.addVendor= {
			vendorId:null,
			vendorName:null,
			vendorAddress:null,
			vendorTinNo:null,
			vendorContactPerson:null,
			vendorContactNo:null,
			vendorIndroducedBy:null,
			vendorIntroducedByPersonName:null,
			saved:false
		};
		

		
		
		$scope.saveVendor = function(){
			
		/* inventoryFactory.getVendors().save($scope.addVendor).$promise.then(function(response){

				console.log($scope.addVendor);

				$scope.addVendorForm.$setPristine();
				$scope.addVendor= {
					vendorId:null,
					vendorName:null,
					vendorAddress:null,
					vendorTinNo:null,
					vendorContactPerson:null,
					vendorContactNo:null,
					vendorIndroducedBy:null,
					vendorIntroducedByPersonName:null,
					saved:false
		};
		$scope.showalert_add_vendor=true;
		}
		*/
		
		}
	}])
;