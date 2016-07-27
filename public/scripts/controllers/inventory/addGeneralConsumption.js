'use strict';
angular.module('App')
.controller('AddGeneralConsumptionController',['$scope','authorize','inventoryFactory','regularForm', function($scope,authorize,inventoryFactory, regularForm){

		$scope.regularForm = regularForm.regularForm;
		$scope.showAlert=false;
		$scope.quantityError = function(){
			$scope.message = 'Quantity Error. Check quantity for the item.';
			$scope.messageColor = 'danger';
			$scope.showAlert = true;
		}
		$scope.items = [];
		inventoryFactory.getFloor(authorize.getCentre()).query().$promise.then(function(response){
			$scope.filteredItems =response; 
		},function(response){
			alert('Failed to retrieve items on floor');
		})
		
		$scope.addItem = function(filteredItem,index){
			$scope.addingItem=false;
			$scope.items.push(filteredItem);
			$scope.filteredItems.splice(index,1);
		}


		$scope.removeItem = function(item,index){
			$scope.filteredItems.push(item);
			$scope.items.splice(index,1);
		}

		$scope.addGeneralConsumption = function(){
			if($scope.items.length==0)
			{
				$scope.message = 'Add atleast one item';
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
				return;
			}
			$scope.addingItem=false;
			inventoryFactory.getGeneralConsumptions(authorize.getCentre()).save({centreId: authorize.getCentre(),date:new Date(), lastModifiedBy: authorize.getUsername()}).$promise.then(function(response){
				$scope.generalConsumptionId = response.generalConsumptionId;
				for(var i=0;i<$scope.items.length;i++){
					$scope.items[i].lastModifiedBy = authorize.getUsername();
					$scope.items[i].generalConsumptionId = $scope.generalConsumptionId;
					inventoryFactory.getGeneralConsumptionItems(authorize.getCentre(),$scope.generalConsumptionId).save($scope.items[i]).$promise.then(function(response){

					},function(response){
						alert('Saving some items failed');
					})
				}

				inventoryFactory.getFloor(authorize.getCentre()).query().$promise.then(function(response){
					$scope.floorItems = response;
					for(var i=0;i<$scope.items.length;i++){
						console.log('outer loop');
						for(var j=0;j<$scope.floorItems.length;j++)
						{
							console.log('comparing '+$scope.floorItems[j].itemId+' and '+$scope.items[i].itemId);
							if($scope.floorItems[j].itemId == $scope.items[i].itemId)
							{
								console.log("item "+$scope.floorItems[j].itemId+' present');
								$scope.floorItems[j].availableQuantity-=$scope.items[i].quantity;
								inventoryFactory.getFloor(authorize.getCentre()).update({centreId:$scope.floorItems[j].centreId, itemId: $scope.floorItems[j].itemId},$scope.floorItems[j]);
							}
						}
					}
					$scope.message = 'Sucessfully added!';
					$scope.messageColor = 'success';
					$scope.showAlert = true;
					inventoryFactory.getFloor(authorize.getCentre()).query().$promise.then(function(response){
						$scope.filteredItems =response; 
					},function(response){
						alert('Failed to retrieve items on floor');
					});
					$scope.items = [];
				},function(response){
					alert('Floor update failed');
				});

				
			},function(response){
				alert('consumption save failed');
				$scope.message = 'Failed to added!';
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
			})
		}
}])
