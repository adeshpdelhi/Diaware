'use strict';
angular.module('App')
.controller('AddIndentController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
		$scope.savedOnce = false;
		/////////
		$scope.showAlert=false;
		
		
		$scope.indent = {
			centreId:null,
			requestDate:new Date(),
			requiredByDate:new Date(),
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
		$scope.updateFilteredItems = function(){
			inventoryFactory.getItems().query().$promise.then(function(response){
				$scope.filteredItems = response;
				inventoryFactory.getStocks(authorize.getCentre()).query().$promise.then(function(response){
					$scope.stocks = response;
					for(var i=0;i<$scope.filteredItems.length;i++)
					{
						for(j=0;j<$scope.stocks.length;j++){
							if($scope.filteredItems[i].itemId == $scope.stocks[j].itemId)
							{
								$scope.filteredItems[i].availableQuantity = $scope.stocks[j].availableQuantity;
							}
						}
						if($scope.filteredItems[i].availableQuantity==null)
							$scope.filteredItems[i].availableQuantity = 0;
					}
				},function(response){ alert("Failed to retrieve item's availableQuantity from stock"); });
			},function(response){
				alert('item retieval failed');
			});
		}
		$scope.updateFilteredItems();
		inventoryFactory.getVendors().query().$promise.then(function(response){
			$scope.vendors = response;
		},function(response){
			alert('vendors retieval failed');
		});
		

		// $scope.itemNameChanged = function(){
		// 	console.log('item printed in next line');
		// 	console.log($scope.indentItem.itemName);
		// 	$scope.usageTypes=[];
		// 	for(var i=0;i<$scope.items.length; i++)
		// 	{
		// 		if($scope.items[i].itemName == $scope.indentItem.itemName)
		// 		{
		// 			if($scope.usageTypes.includes($scope.items[i].usageTypes)==false)
		// 				$scope.usageTypes.push($scope.items[i].usageTypes);
		// 		}
		// 	}
		// }

		

		$scope.removeItem = function(index){
			console.log('deleting iindex'+index);
		    // for (var i = 0; i <$scope.indentItems.length; i++) {
      //           if($scope.indentItems[i].itemId == itemId){
                    $scope.indentItems.splice(index,1);
            //     }
            // }
		};

		$scope.addItem = function(obj){
			console.log(obj);
			$scope.indentItem=obj;
			$scope.showAlert=false;
		    $scope.indentItem.lastModifiedBy = authorize.getUsername();
			// if($scope.indentItems.length)
			// 	$scope.indentItem.itemNumber = $scope.indentItems[$scope.indentItems.length - 1].itemNumber + 1;
			// else $scope.indentItem.itemNumber = 0;
			
			
			
			$scope.indentItems.push($scope.indentItem);
			//console.log($scope.indentItem);
			
			//$scope.indentForm.$setPristine();
			// for(var i=0;i<$scope.filteredItems.length;i++){
			// 	$scope.filteredItems[i].availableQuantity=$scope.filteredItems[i].quantityRequired=0;
			// }
			$scope.updateFilteredItems();
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
		

		$scope.raiseIndent = function(){
			$scope.indent.status="Raised";
			$scope.indent.centreId=authorize.getCentre();
			$scope.indent.lastModifiedBy=authorize.getUsername();
			inventoryFactory.getIndents(authorize.getCentre()).save($scope.indent).$promise.then(function(response){
					console.log('indent id is '+response.indentId);
					$scope.indentId=response.indentId;
					console.log($scope.indentItems);
					console.log('here. length is '+$scope.indentItems.length);
					for(var i = 0; i <  $scope.indentItems.length;  i++){			
						$scope.indentItems[i].indentId=response.indentId;
						$scope.indentItems[i].linkedStatus="Raised";
						inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).save($scope.indentItems[i]).$promise.then(function(response){
						},function(response){
							$scope.messageColor = 'danger';
							$scope.showAlert = true;
							$scope.message = ' partial save failed';
							return;
						});	
					}
					$scope.indentForm.$setPristine();
					$scope.savedOnce = true;
					$scope.message = 'Raised successfully!';
					$scope.messageColor = 'success';
					$scope.showAlert = true;
					$scope.indent = {
						centreId:null,
						requestDate:new Date(),
						requiredByDate:new Date(),
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
				
			},function(response){
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
				$scope.message = 'Saving failed';
			});

			
			
		};


		$scope.saveIndent = function(){
			$scope.indent.status="Saved";
			$scope.indent.centreId=authorize.getCentre();
			$scope.indent.lastModifiedBy=authorize.getUsername();
			inventoryFactory.getIndents(authorize.getCentre()).save($scope.indent).$promise.then(function(response){
					console.log('indent id is '+response.indentId);
					$scope.indentId=response.indentId;
					console.log($scope.indentItems);
					console.log('here. length is '+$scope.indentItems.length);
					for(var i = 0; i <  $scope.indentItems.length;  i++){	
						$scope.indentItems[i].linkedStatus="Saved";		
						$scope.indentItems[i].indentId=response.indentId;
						inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).save($scope.indentItems[i]).$promise.then(function(response){
						},function(response){
							$scope.messageColor = 'danger';
							$scope.showAlert = true;
							$scope.message = ' partial save failed';
							return;
						});	
					}
					$scope.indentForm.$setPristine();
					$scope.savedOnce = true;
					$scope.message = 'Saved successfully!';
					$scope.messageColor = 'success';
					$scope.showAlert = true;
					$scope.indent = {
						centreId:null,
						requestDate:new Date(),
						requiredByDate:new Date(),
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
				
			},function(response){
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
				$scope.message = 'Saving failed';
			});

			
			
		};
		
		

}])
;