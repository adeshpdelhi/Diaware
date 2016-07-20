'use strict';
angular.module('App')
.controller('InventoryIdentingController',['$scope','authorize', function($scope,authorize){
	
	
	$scope.showalert_inventory_identing=false;
		$scope.treatmentIndentingItems=[];
		$scope.treatmentIndentingItem = {
			ID:null,
			itemName:null,
			usageType:null,
			brandName:null,
			quantityRequired:null,
			availableQuantity:null,
			quantityType:null,
			saved:false
		};
		
		var cnt = 0;
		$scope.addItem = function(){
			$scope.showalert_inventory_identing=false;
			//$scope.item.ID = cnt++;
			//$scope.event.patientId = $scope.newpatient_basic.id;
			//$scope.item.lastModifiedBy = $scope.newpatient_basic.lastModifiedBy;
			$scope.treatmentIndentingItems.push($scope.treatmentIndentingItem);
			console.log($scope.treatmentIndentingItem);
			//$scope.item.saved:true;
			$scope.inventoryIdentingForm.$setPristine();
			
			$scope.treatmentIndentingItem = {
				ID:null,
				itemName:null,
				usageType:null,
				brandName:null,
				quantityRequired:null,
				availableQuantity:null,
				quantityType:null,
				saved:false
		};
		}
		
		$scope.sendRequest = function(){
			
		}
		
		
	
	}])
;