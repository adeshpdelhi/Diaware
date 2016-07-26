'use strict';
angular.module('App')
.controller('ViewTreatmentConsumptionController',['$scope','authorize','inventoryFactory','$uibModal','regularForm', function($scope,authorize,inventoryFactory, $uibModal, regularForm){
		$scope.regularForm = regularForm.regularForm;
		inventoryFactory.getConsumptions(authorize.getCentre()).query().$promise.then(function(response){
			$scope.consumptions = response;
		}, function(response){
			alert('fetching consumptions failed');
		});
	
		
		$scope.openConsumption = function(treatmentId){
			$uibModal.open({
	          templateUrl: 'views/inventory/ViewInventory/viewTreatmentConsumptionModal.html',
	          controller: 'ViewTreatmentConsumptionModalController',
	          size:'lg' ,
	          resolve: {
	            treatmentId: function () {
	             return treatmentId;
	            }
	          }
	        });
		};
		
		
	
	}])

.controller('ViewTreatmentConsumptionModalController', ['$scope', '$state', 'authorize', '$uibModalInstance', 'inventoryFactory','treatmentId', 'regularForm', function ($scope, $state, authorize, $uibModalInstance, inventoryFactory,treatmentId, regularForm) {

		$scope.regularForm = regularForm.regularForm;
		$scope.treatmentId = treatmentId;
		inventoryFactory.getConsumptions(authorize.getCentre()).get({treatmentId:treatmentId}).$promise.then(function(response){
			$scope.consumption = response;
			inventoryFactory.getConsumptionItems(authorize.getCentre(),treatmentId).query().$promise.then(function(response){
					$scope.consumptionItems = response;
			},function(response){
				alert('failed to retrieve consumption items');
			});
		},function(response){
			alert('failed to retrieve consumption');
		});
        // $uibModalInstance.close();
        // $state.go('app.home', {}, {reload: true});

}])
;