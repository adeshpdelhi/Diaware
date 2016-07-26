'use strict';
angular.module('App')
.controller('ManageDialysisItemsContoller',['$scope','inventoryFactory','authorize',function($scope,inventoryFactory,authorize){

	$scope.updateAllItems = function(){
		inventoryFactory.getDialysisItems().query().$promise.then(function(response){
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
						if(present == false){
							$scope.filteredItems.push(response[i]);
						}
					}
				}
				console.log($scope.filteredItems);
			},function(response){
				alert('Failed to retrieve all items');
			})

		},function(response){
			alert('Failed to retrieve dialysis items');
		})
	}

	$scope.updateAllItems();
	$scope.removeItem = function(treatmentItem){
			inventoryFactory.getDialysisItems().delete({itemId: treatmentItem.itemId});
			$scope.updateAllItems();
	};
	$scope.addItem = function(filteredItem){
			inventoryFactory.getDialysisItems().save({itemId: filteredItem.itemId});
            $scope.updateAllItems();
		};

}]);