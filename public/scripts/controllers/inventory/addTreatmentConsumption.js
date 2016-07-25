'use strict';
angular.module('App')
.controller('AddTreatmentConsumptionController',['$scope','authorize','appointmentFactory','inventoryFactory','regularForm','$uibModal', function($scope,authorize,appointmentFactory, inventoryFactory, regularForm,$uibModal){
		$scope.regularForm = regularForm.regularForm;
	
		$scope.showAlert=false;
		
		// $scope.treatmentInventory= {
		// 	treatmentId:null,
		// 	treatmentType:null,
		// 	saved:false
		// };
		$scope.pendingTreatments = [];
		$scope.daysToLoop = {};
		appointmentFactory.getPastAppointments(authorize.getCentre()).query({attended:true}).$promise.then(function(response){
			$scope.appointments = response;
			inventoryFactory.getConsumptions(authorize.getCentre()).query().$promise.then(function(response){
				$scope.consumptions = response;
				for(var i=0;i<$scope.appointments.length;i++)
				{
					var present = false;
					for(var j=0;j<$scope.consumptions.length;j++){
						if($scope.appointments[i].appointmentId == $scope.consumptions[j].treatmentId)
							present=true;
					}
					if(present == false){
						$scope.pendingTreatments.push($scope.appointments[i]);
						$scope.daysToLoop[$scope.appointments[i].dayOfTheWeek] = true;
					}
				}
			},function(response){
				alert('Failed to retrieve consumptions');
			})
			console.log(response);
		},function(response){alert('Failed to retrieve appointments')})
		// need to add attributes of editable table given in excel
		
		$scope.openAddConsumption = function(appointmentId){
			$uibModal.open({
              templateUrl: 'views/inventory/addTreatmentConsumptionModal.html',
              controller: 'AddConsumptionModalController',
              size:'lg',
	          resolve: {
	            appointmentId: function () {
	             return appointmentId;
	            }
	          }
            });
		};
	
	}])
.controller('AddConsumptionModalController', ['$scope', '$state', 'authorize', '$uibModalInstance', 'appointmentId','inventoryFactory', function ($scope, $state, authorize, $uibModalInstance, appointmentId,inventoryFactory) {

		$scope.appointmentId = appointmentId;
		inventoryFactory.getDialysisItems().query().$promise.then(function(response){
			$scope.dialysisItems = response;
		},function(response){
			alert('failed to retrieve dialysis items');
		});

		inventoryFactory.getCatheterizationItems().query().$promise.then(function(response){
			$scope.catheterizationItems = response;
		},function(response){
			alert('failed to retrieve catheterization items');
		});


	    //$uibModalInstance.close();
	    //$state.go('app.home', {}, {reload: true});

}])

;