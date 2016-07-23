'use strict';
angular.module('App')
.controller('AddIndentController',['$scope','authorize', function($scope,patientFactory,authorize){
		$scope.savedOnce = false;
		/////////
		$scope.showalert_inventory_identing=false;
		
		
		$scope.treatmentIndenting = {
			centreId:null,
			requestDate:null,
			requiredByDate:null,
			stockOrderTo:null,
			status:null
			
		};
		
		
		$scope.treatmentIndentingItems=[];
		$scope.treatmentIndentingItem = {
				itemNumber:null,
				type:null,
				itemName:null,
				usageType:null,
				brandName:null,
				quantityRequired:null,
				availableQuantity:null,
				quantityMeasurementType:null,
				saved:false
		};
		
		
		
		
		$scope.addItem = function(){
			
			$scope.showalert_inventory_identing=false;
		    $scope.treatmentIndentingItem.lastModifiedBy = authorize.getUsername();
			if($scope.treatmentIndentingItems.length)
				$scope.treatmentIndentingItem.itemNumber = $scope.treatmentIndentingItems[$scope.treatmentIndentingItems.length - 1].itemNumber + 1;
			else $scope.treatmentIndentingItem.itemNumber = 0;
			
			$scope.treatmentIndentingItem.type="Raised";
			
			$scope.treatmentIndentingItems.push($scope.treatmentIndentingItem);
			console.log($scope.treatmentIndentingItem);
			
			$scope.inventoryIdentingForm.$setPristine();
			
			$scope.treatmentIndentingItem = {
				itemNumber:null,
				type:null,
				itemName:null,
				usageType:null,
				brandName:null,
				quantityRequired:null,
				availableQuantity:null,
				quantityMeasurementType:null,
				saved:false
		};
			
			
			
		}
		

		$scope.sendRequest = function(){
			if($scope.treatmentIndenting.itemName !== '' || $scope.treatmentIndenting.usageType !== '' || $scope.treatmentIndenting.brandName !== ''
				|| $scope.treatmentIndenting.quantityRequired !== ''|| $scope.treatmentIndenting.avalaibleQuantity !== ''|| $scope.treatmentIndenting.quantityMeasurementType !== ''){
				
				if($scope.treatmentIndentingItems.length)
					$scope.treatmentIndentingItem.itemNumber = $scope.treatmentIndentingItems[$scope.treatmentIndentingItems.length - 1].itemNumber + 1;
				else 
					$scope.treatmentIndentingItem.itemNumber = 0;
			
				$scope.treatmentIndentingItem.lastModifiedBy = authorize.getUsername();
				$scope.treatmentIndentingItem.type="Raised";

				$scope.treatmentIndentingItems.push($scope.treatmentIndentingItem);
				console.log($scope.treatmentIndentingItem);
			}
			/////////////////////////////////
			
			$scope.treatmentIndenting.centreId=authorize.getCentre();
			inventoryFactory.getIdents(authorize.getCentre()).save($scope.treatmentIndenting).$promise.then(function(response){
				
					$scope.indentId=response.indentId;
				
				
					var x = 0;
					for(var i = 0; i<$scope.treatmentIndentingItems.length;i++){
						
						scope.treatmentIndentingItems[i].indentId=response.indentID;
						if(!$scope.treatmentIndentingItems[i].saved){
							$scope.treatmentIndentingItems[i].saved = true;
							var id ;
							console.log("i" + i);
							console.log("x:outside " + x);
							inventoryFactory.getIdentsItems(authorize.getCentre(),response.indentId).save($scope.treatmentIndentingItems[i]).$promise.then(function(response){
								//$scope.showalert_events=true;
								console.log($scope.treatmentIndentingItems[x]);
								//$scope.events[x].id = response.id;
								//console.log("x:inside " + x);
								x++;
							},function(response){
								$scope.showalert_events=false;
								console.log(response);
							});	
						}
						else x++;
					}
					for(var i = 0; i<$scope.treatmentIndentingItems.length;i++){
						console.log($scope.treatmentIndentingItems[i].id + " " + $scope.treatmentIndentingItems[i].saved);
					}
					$scope.inventoryIdentingForm.$setPristine();
					$scope.savedOnce = true;
					$scope.treatmentIndenting = {
						centreId:null,
						requestDate:null,
						requiredByDate:null,
						stockOrderTo:null,
						status:null
						
					};
		
		
		//$scope.treatmentIndentingItems=[];
					$scope.treatmentIndentingItem = {
							itemNumber:null,
							type:null,
							itemName:null,
							usageType:null,
							brandName:null,
							quantityRequired:null,
							availableQuantity:null,
							quantityMeasurementType:null,
							saved:false
					};
				
				
				
				
				
				
				
			});

			
			
		};
		
		

}])
;