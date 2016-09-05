'use strict';
angular.module('App')
.controller('ViewItemsController',['$scope','inventoryFactory',function($scope, inventoryFactory){
	inventoryFactory.getItems().query(function(response){
		$scope.items = response;
	});
	// $scope.edit = false;
	// var deletedItems = [];
	$scope.removeItem = function(Id){
		// for (var i = $scope.items.length - 1; i >= 0; i--) {
		// 	if($scope.items[i].itemId == itemId){
		// 		deletedItems.push($scope.items[i]);
		// 		$scope.items.splice(i,1);
		// 	}
		// }
		inventoryFactory.getItems().delete({itemId:Id}).$promise.then(function(response){
				console.log(response);
				$scope.showAlert = true;
				$scope.message="Successfully Deleted Item!" ;
				$scope.messageColor = "success";
			},function(response){
				console.log(response);
				$scope.showAlert = true;
				$scope.messageColor = 'danger';
				$scope.message = "Error: "+ response.status+' ' +response.statusText + "!";
				if(response.status == 400)
					$scope.message = 'You cannot delete an item used in a treatment/general consumption!'
			});
		inventoryFactory.getItems().query(function(response){
			$scope.items = response;
		});
	};
	// $scope.saveChanges = function(){
	// 	$scope.edit = false;
		
	// 	for (var i = deletedItems.length - 1; i >= 0; i--) {
	// 		inventoryFactory.getItems().delete({itemId:deletedItems[i].itemId}).$promise.then(function(response){
	// 			console.log(response);
	// 			$scope.showAlert = true;
	// 			$scope.message="Successfully Deleted Item!" ;
	// 			$scope.messageColor = "success";
	// 		},function(response){
	// 			console.log(response);
	// 			$scope.showAlert = true;
	// 			$scope.messageColor = 'danger';
	// 			$scope.message = "Error: "+ response.status+' ' +response.statusText + "!";
	// 			if(response.status == 400)
	// 				$scope.message = 'You cannot delete an item used in a treament!'
	// 		});
	// 	}
	// }
}]);