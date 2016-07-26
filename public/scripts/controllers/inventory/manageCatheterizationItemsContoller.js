'use strict';
angular.module('App')
.controller('ManageCatheterizationItemsContoller',['$scope','inventoryFactory','authorize',function($scope,inventoryFactory,authorize){

	$scope.updateAllItems = function(){
		inventoryFactory.getCatheterizationItems().query().$promise.then(function(response){
			$scope.treatmentItems = response;

			inventoryFactory.getItems().query().$promise.then(function(response){
				$scope.filteredItems=[];
				for(var i=0;i<response.length;i++){
					if(response[i].usageType=='Treatment Specific')
					{					
						var present = false;
						for(var j=0;j<$scope.treatmentItems.length;j++)
						{
							if($scope.treatmentItems[j].itemId == response[i].itemId)
								present = true;
						}
						if(present === false){
							$scope.filteredItems.push(response[i]);
						}
					}
				}
				console.log($scope.filteredItems);
			},function(response){
				alert('Failed to retrieve all items');
			});

		},function(response){
			alert('Failed to retrieve catheterization items');
		});
	};

	$scope.updateAllItems();
	$scope.removeItem = function(treatmentItem){
			inventoryFactory.getCatheterizationItems().delete({itemId: treatmentItem.itemId});
			$scope.updateAllItems();
	};
	$scope.addItem = function(filteredItem){
			inventoryFactory.getCatheterizationItems().save({itemId: filteredItem.itemId});
            $scope.updateAllItems();
		};

}]);