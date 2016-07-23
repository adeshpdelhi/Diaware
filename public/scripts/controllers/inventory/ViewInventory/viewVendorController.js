'use strict';
angular.module('App')
.controller('ViewVendorController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
		$scope.close = close;
		$scope.updateVendors = function(){
			inventoryFactory.getVendors(authorize.getCentre()).query().$promise.then(function(response){
		      $scope.vendors = response;
		      console.log(response);
		    },function(response){
		    	alert('unable to fetch vendors');
		    });
		}
		$scope.updateVendors();
		$scope.vendor = {};
		$scope.editVendor = function(vendorId){
			inventoryFactory.getVendors(authorize.getCentre()).get({vendorId:vendorId}).$promise.then(function(response){
				$scope.vendor = response;
			},function(response){
				alert('Vendor retrieval failed');
			})
		};
		$scope.updateVendor = function(){
			inventoryFactory.getVendors(authorize.getCentre()).update({vendorId:$scope.vendor.vendorId},$scope.vendor).$promise.then(function(response){
				inventoryFactory.getVendors(authorize.getCentre()).query().$promise.then(function(response){
			      $scope.vendors = response;
			      console.log(response);
			      $scope.dismiss();
			    },function(response){
			    	alert('unable to fetch vendors');
			    });

			},function(response){
				alert('updation failed');
			})
		}
		$scope.deleteVendor = function(vendorId){
			console.log('deleteVendor for '+vendorId);
			inventoryFactory.getVendors(authorize.getCentre()).remove({vendorId:vendorId});
			$scope.updateVendors();
		}
	}])

.directive('myModal', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
       scope.dismiss = function() {
           element.modal('hide');
       };
     }
   } 
});