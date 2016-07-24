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
		});
		inventoryFactory.getIndentItems(authorize.getCentre(),indentId).query().$promise.then(function(response){
			$scope.indentItems = response;
			for(var i=0;i<$scope.indentItems.length;i++)
				$scope.indentItems[i].retrieved = true;
			console.log($scope.indentItems);
		});
		$scope.toBeRemovedindentItems=[];
		// console.log($scope.indentItems);
	    $scope.removeItem = function(index,indentItem){
				console.log('deleting iindex'+index);
	            $scope.indentItems.splice(index,1);
	            $scope.toBeRemovedindentItems.push(indentItem);
		};

		$scope.activeUser = authorize.getActiveUser();
		$scope.centre = authorize.getCentre();
		$scope.addItem = function(obj){
			console.log(obj);
			$scope.indentItem=obj;
			$scope.showAlert=false;
		    $scope.indentItem.lastModifiedBy = authorize.getUsername();
			$scope.indentItem.item = {itemName: $scope.indentItem.itemName, usageType: $scope.indentItem.usageType, brandName: $scope.indentItem.brandName, quantityMeasurementType: $scope.indentItem.quantityMeasurementType};
			$scope.indentItem.linkedStatus = $scope.viewStatus;
			$scope.indentItem.retrieved = false;
			$scope.indentItems.push($scope.indentItem);
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
			
			for (var i=0;i<$scope.toBeRemovedindentItems.length;i++)
			{
				if($scope.toBeRemovedindentItems[i].retrieved == true)
					inventoryFactory.getIndentItems(authorize.getCentre(),$scope.indentId).remove({itemId:$scope.toBeRemovedindentItems[i].itemId, linkedStatus: $scope.toBeRemovedindentItems[i].linkedStatus});
			}
			inventoryFactory.getIndents(authorize.getCentre()).update({indentId: $scope.indentId},$scope.indent).$promise.then(function(response){
			$scope.indent.status='Saved';
			for(var i=0;i<$scope.indentItems.length;i++)
				$scope.indentItems[i].linkedStatus = 'Saved';
			$scope.indent.centreId=authorize.getCentre();
			$scope.indent.lastModifiedBy=authorize.getUsername();
			console.log('adding back');
			console.log($scope.indentItems);
			for(var i = 0; i <  $scope.indentItems.length;  i++){			
				$scope.indentItems[i].indentId=$scope.indent.indentId;
				if($scope.indentItems[i].retrieved == false){
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
			$scope.indent.status='Raised';
			for(var i=0;i<$scope.indentItems.length;i++)
				$scope.indentItems[i].linkedStatus = 'Raised';
			$scope.indent.centreId=authorize.getCentre();
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
					//$scope.updateIndents();
					$uibModalInstance.close();
					$state.go('app.inventory.indent.view',{},{reload: true});
			},function(response){
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
				$scope.message = 'Raising failed';
			});

			
		};


		$scope.approveIndent = function(){
			$scope.indent.status='Approved';
			for(var i=0;i<$scope.indentItems.length;i++)
				$scope.indentItems[i].linkedStatus = 'Approved';
			$scope.indent.centreId=authorize.getCentre();
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

		$scope.receiveIndent = function(){
			$scope.indent.status='Approved';
			for(var i=0;i<$scope.indentItems.length;i++)
				$scope.indentItems[i].linkedStatus = 'Approved';
			$scope.indent.centreId=authorize.getCentre();
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
}])

;