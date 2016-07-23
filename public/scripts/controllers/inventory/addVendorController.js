'use strict';
angular.module('App')
.controller('AddVendorController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
	
	$scope.showalert_vendor=false;
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
			
		 inventoryFactory.getVendors(authorize.getCentre()).save($scope.vendor).$promise.then(function(response){

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
				$scope.showalert=true;
				$scope.message='Saved successfully';
				$scope.messageColor='success';
		},
		function(response){
			console.log(response);
			$scope.showalert=true;
				$scope.message='Error saving!';
				$scope.messageColor='danger';
		})
		
		
		}
	}])
;