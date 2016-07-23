'use strict';
angular.module('App')
.controller('AddIndentController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
		$scope.savedOnce = false;
		/////////
		$scope.showAlert=false;
		
		
		$scope.indent = {
			centreId:null,
			requestDate:null,
			requiredByDate:null,
			stockOrderTo:null,
			status:null,
			lastModifiedBy:null
		};
		$scope.addingItem = false;
		
		$scope.indentItems=[];
		$scope.indentItem = {
				itemId:null,
				itemName:null,
				usageType:null,
				brandName:null,
				quantityRequired:null,
				availableQuantity:null,
				quantityMeasurementType:null,
				lastModifiedBy:null
		};

		inventoryFactory.getItems().query().$promise.then(function(response){
			// console.log(response);
			// $scope.items = [];
			// for(var i=0;i<response.length;i++)
			// {
			// 	if($scope.items.includes(response[i])==false)
			// 		$scope.items.push(response[i]);
			// }
			$scope.filteredItems = response;
		},function(response){
			alert('item retieval failed');
		});
		

		$scope.itemNameChanged = function(){
			console.log('item printed in next line');
			console.log($scope.indentItem.itemName);
			$scope.usageTypes=[];
			for(var i=0;i<$scope.items.length; i++)
			{
				if($scope.items[i].itemName == $scope.indentItem.itemName)
				{
					if($scope.usageTypes.includes($scope.items[i].usageTypes)==false)
						$scope.usageTypes.push($scope.items[i].usageTypes);
				}
			}
		}

		

		$scope.removeItem = function(itemId){
			console.log('deleting itemId '+itemId);
		    for (var i = 0; i <$scope.indentItems.length; i++) {
                if($scope.indentItems[i].itemId == itemId){
                    $scope.indentItems.splice(i,1);
                }
            }
		};

		$scope.addItem = function(obj){
			console.log(obj);
			$scope.indentItem=obj;
			$scope.showAlert=false;
		    $scope.indentItem.lastModifiedBy = authorize.getUsername();
			// if($scope.indentItems.length)
			// 	$scope.indentItem.itemNumber = $scope.indentItems[$scope.indentItems.length - 1].itemNumber + 1;
			// else $scope.indentItem.itemNumber = 0;
			
			$scope.indentItem.linkedStatus="Raised";
			
			$scope.indentItems.push($scope.indentItem);
			//console.log($scope.indentItem);
			
			//$scope.indentForm.$setPristine();
			for(var i=0;i<$scope.filteredItems.length;i++){
				$scope.filteredItems[i].availableQuantity=$scope.filteredItems[i].quantityRequired=0;
			}
			$scope.indentItem = {
				itemId:null,
				itemName:null,
				usageType:null,
				brandName:null,
				quantityRequired:null,
				availableQuantity:null,
				quantityMeasurementType:null,
				lastModifiedBy:null
			};
			
			$scope.addingItem=false;
			
		}
		

		$scope.saveIndent = function(){
			// if($scope.indent.itemName !== '' || $scope.indent.usageType !== '' || $scope.indent.brandName !== ''
			// 	|| $scope.indent.quantityRequired !== ''|| $scope.indent.availableQuantity !== ''|| $scope.indent.quantityMeasurementType !== ''){
				
			// 	// if($scope.indentItems.length)
			// 	// 	$scope.indentItem.itemNumber = $scope.indentItems[$scope.indentItems.length - 1].itemNumber + 1;
			// 	// else 
			// 	// 	$scope.indentItem.itemNumber = 0;
			
			// 	$scope.indentItem.lastModifiedBy = authorize.getUsername();
			// 	$scope.indentItem.type="Raised";

			// 	$scope.indentItems.push($scope.indentItem);
			// 	console.log($scope.indentItem);
			// }
			/////////////////////////////////
			
			$scope.indent.centreId=authorize.getCentre();
			$scope.indent.lastModifiedBy=authorize.getUsername();
			inventoryFactory.getIndents(authorize.getCentre()).save($scope.indent).$promise.then(function(response){
				
					$scope.indentId=response.indentId;
					console.log($scope.indentItems);
					console.log('here. length is '+$scope.indentItems.length);
					for(var i = 0; i <  $scope.indentItems.length;  i++){			
						$scope.indentItems[i].indentId=response.indentId;
						inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).save($scope.indentItems[i]).$promise.then(function(response){
						},function(response){
							$scope.messageColor = 'danger';
							$scope.showAlert = true;
							return;
						});	
					}
					$scope.indentForm.$setPristine();
					$scope.savedOnce = true;
					$scope.message = 'Saved!';
					$scope.messageColor = 'success';
					$scope.showAlert = true;
					$scope.indent = {
						centreId:null,
						requestDate:null,
						requiredByDate:null,
						stockOrderTo:null,
						status:null,
						lastModifiedBy:null
					};
		
		
					$scope.indentItems=[];
					$scope.indentItem = {
							itemId:null,
							itemName:null,
							usageType:null,
							brandName:null,
							quantityRequired:null,
							availableQuantity:null,
							quantityMeasurementType:null,
							lastModifiedBy:null
					};
				
				
				
				
				
				
				
			});

			
			
		};
		
		

}])
;