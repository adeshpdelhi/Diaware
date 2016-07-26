'use strict';
angular.module('App')
.controller('ViewGeneralConsumptionController',['$scope','authorize','inventoryFactory','$uibModal','regularForm', function($scope,authorize,inventoryFactory, $uibModal, regularForm){
		$scope.regularForm = regularForm.regularForm;
		inventoryFactory.getGeneralConsumptions(authorize.getCentre()).query().$promise.then(function(response){
			$scope.generalConsumptions = response;
		}, function(response){
			alert('fetching consumptions failed');
		})
	
		
		$scope.openGeneralConsumption = function(generalConsumptionId){
			$uibModal.open({
	          templateUrl: 'views/inventory/ViewInventory/viewGeneralConsumptionModal.html',
	          controller: 'ViewGeneralConsumptionModalController',
	          size:'lg' ,
	          resolve: {
	            generalConsumptionId: function () {
	             return generalConsumptionId;
	            }
	          }
	        });
		}
		
		
	
	}])

.controller('ViewGeneralConsumptionModalController', ['$scope', '$state', 'authorize', '$uibModalInstance', 'inventoryFactory','generalConsumptionId', 'regularForm', function ($scope, $state, authorize, $uibModalInstance, inventoryFactory, generalConsumptionId, regularForm) {

		$scope.regularForm = regularForm.regularForm;
		$scope.generalConsumptionId = generalConsumptionId;
		inventoryFactory.getGeneralConsumptions(authorize.getCentre()).get({generalConsumptionId:generalConsumptionId}).$promise.then(function(response){
			$scope.generalConsumption = response;
			inventoryFactory.getGeneralConsumptionItems(authorize.getCentre(),generalConsumptionId).query().$promise.then(function(response){
					$scope.generalConsumptionItems = response;
			},function(response){
				alert('failed to retrieve general consumption items');
			});
		},function(response){
			alert('failed to retrieve general consumption');
		});
        // $uibModalInstance.close();
        // $state.go('app.home', {}, {reload: true});

}])
;