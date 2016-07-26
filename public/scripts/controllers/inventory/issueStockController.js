'use strict';
angular.module('App')
.controller('IssueStockController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
	
	
	$scope.showAlert=false;
		$scope.issueStockItems=[];
		$scope.addingItem = false;
		// $scope.issueStockItem = {
		// 	ID:null,
		// 	itemName:null,
		// 	usageType:null,
		// 	brandName:null,
		// 	quantityRequired:null,
		// 	quantityType:null,
		// 	saved:false
		// };
		
		$scope.issueStock = {
			stockIssuedTo:null,
			estimatedSingleUse:null,
			estimatedReUse:null,
			estimatedNewDialyser:null,
			estimatedCatehterizationDoubleLumen:null,
			estimatedCatehterizationSingleumen:null,
			stockIssueDate:new Date(),
			stockTakerName:null,
			nextExpectedStockIssueDate:new Date(),
			lastModifiedBy:null
		};
		inventoryFactory.getStocks(authorize.getCentre()).query().$promise.then(function(response){
					$scope.filteredItems = response;
					console.log(response);
					for(var i=0;i<$scope.filteredItems.length;i++)
						$scope.filteredItems[i].quantity=0;
				},function(response){
					alert('failed to retrieve stocks');
				});
		$scope.updateFilteredItems = function(){
				for(var i=0;i<$scope.filteredItems.length;i++)
						$scope.filteredItems[i].quantity=0;
		};
		$scope.addStockItem = function(issueStockItem,index){
			console.log(issueStockForm);
			$scope.issueStockItem=issueStockItem;
			$scope.issueStockItem.item = {itemId:issueStockItem.itemId,itemName:issueStockItem.itemName, usageType:issueStockItem.usageType, brandName:issueStockItem.brandName,quantityMeasurementType:issueStockItem.quantityMeasurementType};
			// for (var i=0;i<$scope.issueStockItems.length;i++)
			// 	if($scope.issueStockItem.itemId == $scope.issueStockItems[i].itemId)
			// 	{
			// 		alert('Item already exists in the list');
			// 		return;
			// 	}
			$scope.filteredItems.splice(index,1);
			console.log('here index is '+index);
			$scope.showAlert=false;
		    $scope.issueStockItem.lastModifiedBy = authorize.getUsername();
			$scope.issueStockItems.push($scope.issueStockItem);
			$scope.updateFilteredItems();
			$scope.addingItem=false;
			
		};
		
		$scope.removeItem = function(filteredItem, index){
			console.log('deleting iindex'+index);
            $scope.issueStockItems.splice(index,1);
            console.log('adding this');
            console.log(filteredItem);
            $scope.filteredItems.push(filteredItem);
            $scope.updateFilteredItems();
		};

		$scope.doIssueStock = function(){
			console.log($scope.issueStock);
			$scope.issueStock.centreId=authorize.getCentre();
			$scope.issueStock.lastModifiedBy=authorize.getUsername();
			console.log($scope.issueStock);
			inventoryFactory.getStocksIssued(authorize.getCentre()).save($scope.issueStock).$promise.then(function(response){
					console.log('stockIssuedId id is '+response.stockIssuedId);
					$scope.stockIssuedId=response.stockIssuedId;
					console.log($scope.issueStockItems);
				//	console.log('here. length is '+$scope.indentItems.length);
					for(var i = 0; i <  $scope.issueStockItems.length;  i++){			
						$scope.issueStockItems[i].stockIssuedId=$scope.stockIssuedId;
						inventoryFactory.getStockIssuedItems(authorize.getCentre(),$scope.stockIssuedId).save($scope.issueStockItems[i]).$promise.then(function(response){
						},function(response){
							$scope.messageColor = 'danger';
							$scope.showAlert = true;
							$scope.message = ' partial save failed';
							return;
						});	
					}
					inventoryFactory.getStocks(authorize.getCentre()).query().$promise.then(function(response){
						$scope.stocks= response;
						for(var i=0;i<$scope.issueStockItems.length;i++){
							for(var j=0;j<$scope.stocks.length;j++)
							{
								if($scope.stocks[j].itemId == $scope.issueStockItems[i].itemId)
								{
									$scope.stocks[j].availableQuantity-=$scope.issueStockItems[i].quantity;
									inventoryFactory.getStocks(authorize.getCentre()).update({centreId:$scope.stocks[j].centreId, itemId: $scope.stocks[j].itemId},$scope.stocks[j]);
								}
							}
						}
					if($scope.issueStock.stockIssuedTo == 'Floor'){
						inventoryFactory.getFloor(authorize.getCentre()).query().$promise.then(function(response){
							$scope.floorItems= response;
							for(var i=0;i<$scope.issueStockItems.length;i++){
								var present = false;
								console.log('outer loop');
								for(var j=0;j<$scope.floorItems.length;j++)
								{
									console.log('comparing '+$scope.floorItems[j].itemId+' and '+$scope.issueStockItems[i].itemId);
									if($scope.floorItems[j].itemId == $scope.issueStockItems[i].itemId)
									{
										console.log("item "+$scope.floorItems[j].itemId+' present');
										$scope.floorItems[j].availableQuantity+=$scope.issueStockItems[i].quantity;
										inventoryFactory.getFloor(authorize.getCentre()).update({centreId:$scope.floorItems[j].centreId, itemId: $scope.floorItems[j].itemId},$scope.floorItems[j]);
										present = true;
									}
								}
								if(present === false){
									console.log("item "+$scope.issueStockItems[i].itemId+' not present');
									var newFloorItem = {itemId:$scope.issueStockItems[i].itemId,centreId:authorize.getCentre(),availableQuantity: $scope.issueStockItems[i].quantity,lastModifiedBy:authorize.getUsername()};
									inventoryFactory.getFloor(authorize.getCentre()).save(newFloorItem);
								}
							}
						});
					}

					$scope.issueStockForm.$setPristine();
					$scope.savedOnce = true;
					$scope.message = 'Issued successfully!';
					$scope.messageColor = 'success';
					$scope.showAlert = true;
					$scope.issueStock = {
						stockIssuedTo:null,
						estimatedSingleUse:null,
						estimatedReUse:null,
						estimatedNewDialyser:null,
						estimatedCatehterizationDoubleLumen:null,
						estimatedCatehterizationSingleumen:null,
						stockIssueDate:new Date(),
						stockTakerName:null,
						nextExpectedStockIssueDate:new Date(),
						lastModifiedBy:null
					};
					//$scope.issueStockItems = [];

				},function(response){alert('failed to update stocks');});
				
			},function(response){
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
				$scope.message = 'Saving failed';
			});
		};
		
		
	
	}])
;