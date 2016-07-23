'use strict';
angular.module('App')
.controller('ViewIndentsController',['$scope','authorize','inventoryFactory','$uibModal', function($scope,authorize,inventoryFactory,$uibModal){
	
	
		inventoryFactory.getIndents(authorize.getCentre()).query().$promise.then(function(response){
			$scope.indents = response;
		},function(response){
			alert('indents retieval failed');
		});
		
		$scope.openIndent = function(indentId){
			inventoryFactory.getIndents(authorize.getCentre()).get({indentId:indentId}).$promise.then(function(response){
				$scope.indent = response;
			});
			inventoryFactory.getIndentItems(authorize.getCentre(),indentId).query().$promise.then(function(response){
				$scope.indentItems = response;
				console.log(response);
			});
            var modalInstance = $uibModal.open({
              templateUrl: 'views/inventory/ViewInventory/editIndentsModal.html',
              controller: 'EditIndentsModalController',
              size:'lg',
              resolve: {
	            indent: function () {
	             return $scope.indent;
	            },
	            indentItems: function(){
	            	return $scope.indentItems;
	            }
	          }
            });
        };
		
	
	}])


.controller('EditIndentsModalController', ['$scope', '$state', 'authorize', '$uibModalInstance','indent','indentItems','inventoryFactory', function ($scope, $state, authorize, $uibModalInstance, indent, indentItems, inventoryFactory) {

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
	$scope.indent = indent;	
	$scope.indentItems = indentItems;
    $scope.removeItem = function(index){
			console.log('deleting iindex'+index);
                    $scope.indentItems.splice(index,1);
		};

		$scope.addItem = function(obj){
			console.log(obj);
			$scope.indentItem=obj;
			$scope.showAlert=false;
		    $scope.indentItem.lastModifiedBy = authorize.getUsername();
			$scope.indentItem.linkedStatus="Raised";
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
			$scope.indent.status="Raised";
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
							$scope.message = ' partial save failed';
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
			},function(response){
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
				$scope.message = 'Saving failed';
			});
		};
}])

;