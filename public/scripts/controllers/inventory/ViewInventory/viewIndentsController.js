'use strict';
angular.module('App')
.controller('ViewIndentsController',['$scope','authorize','inventoryFactory','$uibModal', function($scope,authorize,inventoryFactory,$uibModal){
	
	
		inventoryFactory.getIndents(authorize.getCentre()).query().$promise.then(function(response){
			$scope.indents = response;
		},function(response){
			alert('indents retieval failed');
		});
		
		$scope.openIndent = function(indentId){
			
            var modalInstance = $uibModal.open({
              templateUrl: 'views/inventory/ViewInventory/editIndentsModal.html',
              controller: 'EditIndentsModalController',
              size:'lg',
              resolve: {
	            indentId: function () {
	             return indentId;
	            }
	          }
            });
        };
		
	
	}])


.controller('EditIndentsModalController', ['$scope','authorize', '$uibModalInstance','inventoryFactory', 'indentId','$state',function ($scope, authorize, $uibModalInstance,  inventoryFactory, indentId,$state) {
	$scope.indentId = indentId;
	$scope.viewStatus = '';
	inventoryFactory.getVendors().query().$promise.then(function(response){
			$scope.vendors = response;
		},function(response){
			alert('vendors retieval failed');
		});
		inventoryFactory.getItems().query().$promise.then(function(response){
			$scope.filteredItems = response;
		},function(response){
			alert('item retieval failed');
		});
		inventoryFactory.getIndents(authorize.getCentre()).get({indentId:$scope.indentId}).$promise.then(function(response){
				response.requestDate = new Date(response.requestDate);
				response.requiredByDate = new Date(response.requiredByDate);
				$scope.indent = response;
				$scope.viewStatus = response.status;


				inventoryFactory.getItems().query().$promise.then(function(response){
				$scope.filteredItems = response;
				inventoryFactory.getStocks($scope.indent.centreId).query().$promise.then(function(response){
					$scope.stocks = response;
					for(var i=0;i<$scope.filteredItems.length;i++)
					{
						for(var j=0;j<$scope.stocks.length;j++){
							if($scope.filteredItems[i].itemId == $scope.stocks[j].itemId)
							{
								$scope.filteredItems[i].availableQuantity = $scope.stocks[j].availableQuantity;
							}
						}
						if($scope.filteredItems[i].availableQuantity===null)
							$scope.filteredItems[i].availableQuantity = 0;
					}
					for(var i=0;i<$scope.indentItems.length;i++)
					{
						for(var j=0;j<$scope.filteredItems.length;j++)
							if($scope.indentItems[i].itemId == $scope.filteredItems[j].itemId)
								$scope.filteredItems.splice(j,1);
					}
						},function(response){ alert("Failed to retrieve item's availableQuantity from stock"); });
					},function(response){
						alert('item retieval failed');
					});



		});
		inventoryFactory.getIndentItems(authorize.getCentre(),indentId).query().$promise.then(function(response){
			$scope.indentItems = response;
			for(var i=0;i<$scope.indentItems.length;i++)
				$scope.indentItems[i].retrieved = true;
			console.log($scope.indentItems);
		});
		
		$scope.updateFilteredItems = function(){
					for(var i=0;i<$scope.filteredItems.length;i++)
					{
						for(var j=0;j<$scope.stocks.length;j++){
							if($scope.filteredItems[i].itemId == $scope.stocks[j].itemId)
							{
								$scope.filteredItems[i].availableQuantity = $scope.stocks[j].availableQuantity;
							}
						}
						if($scope.filteredItems[i].availableQuantity===null)
							$scope.filteredItems[i].availableQuantity = 0;
					}
		};
		//$scope.updateFilteredItems();

		$scope.toBeRemovedindentItems=[];
		// console.log($scope.indentItems);
	    $scope.removeItem = function(indentItem,index){
				console.log('deleting iindex'+index);
	            $scope.indentItems.splice(index,1);
	            $scope.toBeRemovedindentItems.push(indentItem);
	            indentItem.itemName = indentItem.item.itemName;
	            indentItem.usageType = indentItem.item.usageType;
	            indentItem.brandName = indentItem.item.brandName;
	            indentItem.quantityMeasurementType = indentItem.item.quantityMeasurementType;
	            $scope.filteredItems.push(indentItem);
           		$scope.updateFilteredItems();
		};

		$scope.activeUser = authorize.getActiveUser();
		$scope.centre = authorize.getCentre();
		$scope.addItem = function(indentItem, index){
			$scope.indentItem=indentItem;
			$scope.showAlert=false;
		    $scope.indentItem.lastModifiedBy = authorize.getUsername();
			$scope.indentItem.item = {itemName: $scope.indentItem.itemName, usageType: $scope.indentItem.usageType, brandName: $scope.indentItem.brandName, quantityMeasurementType: $scope.indentItem.quantityMeasurementType};
			$scope.indentItem.linkedStatus = $scope.viewStatus;
			console.log('added item with id '+$scope.indentItem.itemId+' with status '+$scope.viewStatus);
			$scope.indentItem.retrieved = false;
			$scope.indentItems.push($scope.indentItem);
			$scope.filteredItems.splice(index,1);
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
			
		};
		


		$scope.saveIndent = function(){
			
			for (var i=0;i<$scope.toBeRemovedindentItems.length;i++)
			{
				if($scope.toBeRemovedindentItems[i].retrieved === true)
					inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).remove({itemId:$scope.toBeRemovedindentItems[i].itemId, linkedStatus: $scope.toBeRemovedindentItems[i].linkedStatus});
			}
			$scope.indent.status='Saved';
			inventoryFactory.getIndents(authorize.getCentre()).update({indentId: $scope.indentId},$scope.indent).$promise.then(function(response){
			for(var i=0;i<$scope.indentItems.length;i++)
				$scope.indentItems[i].linkedStatus = 'Saved';
			$scope.indent.lastModifiedBy=authorize.getUsername();
			console.log('adding back');
			console.log($scope.indentItems);
			for(var i = 0; i <  $scope.indentItems.length;  i++){			
				$scope.indentItems[i].indentId=$scope.indent.indentId;
				if($scope.indentItems[i].retrieved === false){
					inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).save($scope.indentItems[i]).$promise.then(function(response){
					},function(response){
						$scope.messageColor = 'danger';
						$scope.showAlert = true;
						$scope.message = ' partial save failed';
						return;
					});	
				}
				else
				{
					// inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).update({itemId:$scope.indentItems[i].itemId,linkedStatus: $scope.indentItems[i].linkedStatus},$scope.indentItems[i]).$promise.then(function(response){
					// },function(response){
					// 	$scope.messageColor = 'danger';
					// 	$scope.showAlert = true;
					// 	$scope.message = ' partial save failed';
					// 	return;
					// });	
				}
			}
			$scope.indentForm.$setPristine();
			$scope.savedOnce = true;
			$scope.message = 'Sent!';
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
			$uibModalInstance.close();
			$state.go('app.inventory.indent.view',{},{reload: true});
			});
		
		};

		$scope.raiseIndent = function(){
			inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).query().$promise.then(function(response){
				for (var i=0;i<response.length;i++)
				{
					if(response[i].linkedStatus == 'Saved')
					inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).remove({itemId:response[i].itemId, linkedStatus: response[i].linkedStatus});
				}
			});
			$scope.indent.status='Raised';
			inventoryFactory.getIndents(authorize.getCentre()).update({indentId: $scope.indentId},$scope.indent).$promise.then(function(response){
			for(var i=0;i<$scope.indentItems.length;i++)
				$scope.indentItems[i].linkedStatus = 'Raised';
			$scope.indent.lastModifiedBy=authorize.getUsername();
			console.log('adding back');
			console.log($scope.indentItems);
			for(var i = 0; i <  $scope.indentItems.length;  i++){			
				$scope.indentItems[i].indentId=$scope.indent.indentId;
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
			$scope.message = 'Raised!';
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
			$uibModalInstance.close();
			$state.go('app.inventory.indent.view',{},{reload: true});
			});
			
		};


		$scope.approveIndent = function(){
			$scope.indent.status='Approved';
			for(var i=0;i<$scope.indentItems.length;i++)
				$scope.indentItems[i].linkedStatus = 'Approved';
			$scope.indent.lastModifiedBy=authorize.getUsername();
			inventoryFactory.getIndents(authorize.getCentre()).update({indentId: $scope.indentId},$scope.indent).$promise.then(function(response){
				
				//	$scope.indentId=response.indentId;
					console.log($scope.indentItems);
					console.log('here. length is '+$scope.indentItems.length);
					for(var i = 0; i <  $scope.indentItems.length;  i++){			
						$scope.indentItems[i].indentId=$scope.indent.indentId;
						inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).save($scope.indentItems[i]).$promise.then(function(response){
							//console.log('added item with id');
						},function(response){
							$scope.messageColor = 'danger';
							$scope.showAlert = true;
							$scope.message = ' partial approve failed';
							return;
						});	
					}
					$scope.indentForm.$setPristine();
					$scope.savedOnce = true;
					$scope.message = 'Sent!';
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
					//$scope.updateIndents();
					$uibModalInstance.close();
					$state.go('app.inventory.indent.view',{},{reload: true});
			},function(response){
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
				$scope.message = 'Approving failed';
			});

			
		};
		$scope.isReceiving = false;
		$scope.prepareReceiveIndent = function(){
			$scope.viewStatus = 'Approved';
			$scope.isReceiving = true;
			var tempItems=[];
			for (var i=0;i<$scope.indentItems.length;i++)
				if($scope.indentItems[i].linkedStatus=='Approved')
					tempItems.push($scope.indentItems[i]);
			$scope.indentItems = tempItems; 
			console.log($scope.indentItems);
		};

		$scope.receiveIndent = function(){
			$scope.indent.status='Received';
			for(var i=0;i<$scope.indentItems.length;i++)
				$scope.indentItems[i].linkedStatus = 'Received';
			$scope.indent.lastModifiedBy=authorize.getUsername();
			inventoryFactory.getIndents(authorize.getCentre()).update({indentId: $scope.indentId},$scope.indent).$promise.then(function(response){
				
				//	$scope.indentId=response.indentId;
					console.log($scope.indentItems);
					console.log('here. length is '+$scope.indentItems.length);
					for(var i = 0; i <  $scope.indentItems.length;  i++){			
						$scope.indentItems[i].indentId=$scope.indent.indentId;
						//if($scope.indentItems[i].linkedStatus == 'Approved'){
							inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).save($scope.indentItems[i]).$promise.then(function(response){
								//console.log('added item with id');
							},function(response){
								$scope.messageColor = 'danger';
								$scope.showAlert = true;
								$scope.message = ' partial receive failed.. failed saving to stocks';
								return;
							});	
						//}
					}

					inventoryFactory.getStocks(authorize.getCentre()).query().$promise.then(function(response){
						$scope.stocks=response;
						console.log('stocks received');
						console.log($scope.stocks);
						console.log('indent items present');
						console.log($scope.indentItems);
						for(var i=0;i<$scope.indentItems.length;i++){
							var present = false;
							for(var j=0;j<$scope.stocks.length;j++)
							{
								//console.log('comparing '+$scope.stocks[j].itemId+' '+$scope.indentItems[i].itemId);
								if($scope.stocks[j].itemId == $scope.indentItems[i].itemId)
								{
									$scope.stocks[j].availableQuantity+=$scope.indentItems[i].quantityRequired;
									inventoryFactory.getStocks(authorize.getCentre()).update({centreId:$scope.stocks[j].centreId, itemId: $scope.stocks[j].itemId},$scope.stocks[j]);
									present = true;
									// inventoryFactory.getStocks(authorize.getCentre()).update({centreId:$scope.stocks[j].centreId, itemId: $scope.stocks[j].itemId},$scope.stocks[j],$scope.stocks[j]);
									//console.log($scope.stocks[j].itemId+' quantiy updated to '+$scope.stocks[j].availableQuantity);
								}
							}
							console.log('value of present '+present);
							if(present === false){
								inventoryFactory.getStocks(authorize.getCentre()).save({centreId: authorize.getCentre(),itemId: $scope.indentItems[i].itemId,availableQuantity:$scope.indentItems[i].quantityRequired, lastModifiedBy:authorize.getUsername()});
							}
						}


						$scope.indentForm.$setPristine();
						$scope.savedOnce = true;
						$scope.message = 'Received saved!';
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
						//$scope.updateIndents();
						$uibModalInstance.close();
						$state.go('app.inventory.indent.view',{},{reload: true});




					},function(response){
						alert('stock updation failed');
					});
					
			},function(response){
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
				$scope.message = 'Receiving failed';
			});
	};

}])

;