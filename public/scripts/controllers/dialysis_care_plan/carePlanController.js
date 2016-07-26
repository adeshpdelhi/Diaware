'use strict';
angular.module('App')
	.controller('DialysisCarePlanController',['$scope','patientFactory','choosePatientFactory', 'backendFactory','authorize', function($scope, patientFactory, choosePatientFactory, backendFactory, authorize){
        patientFactory.getPatients(authorize.getCentre()).get({id:choosePatientFactory.getChosenPatient().id}).$promise.then(function(response){
        	$scope.patient = response;
        });
        backendFactory.getCentres().get({id:authorize.getCentre()}).$promise.then(function(response){
        	$scope.accessLinesAvailable = response.accessLinesAvailable;	
        });
		$scope.showalert_dialysis_care_plan=false;
        console.log($scope.patient);
        $scope.carePlan ={
        	patientId: null,
			carePlanId: null,
			prescriptionDate: null,
			dryWeight: null,
			dialysisDurationFirstTime: null,
			dialysisDurationRegular: null,
			BFR: null,
			DFR: null,
			UFR: null,
			heparinFree: null,
			heparinDosageBolus: null,
			heparinDosageHourly: null,
			dialysateType: null,
			dialysateTemperature: null,
			dialysateFrequencyPerWeek: null,
			accessUsed: null,
			lastModifiedBy: null
        };
        backendFactory.getDialyzateTypes().query(function(response){
        	$scope.dialyzateTypes = response;
        });
        $scope.savedOnce = false;
        $scope.saveCarePlan =function(){
        	$scope.carePlan.patientId = $scope.patient.id;
        	console.log("id "+ $scope.carePlan.patientId);
        	$scope.carePlan.lastModifiedBy = authorize.getUsername();
        	patientFactory.getPatientCarePlans($scope.carePlan.patientId, authorize.getCentre()).save($scope.carePlan).$promise.then(function(response){
				$scope.showalert_dialysis_care_plan=true;
				$scope.message = "Updated Successfully!";			
				$scope.messageColor = 'success';
				$scope.savedOnce = true;
			},function(response){
					$scope.showalert_dialysis_care_plan=false;
					console.log(response);
					$scope.message = "Error: " + response.status + " " +response.statusText + " !";
					$scope.messageColor = 'danger';
			}
			
			);		
        };

    }])
    ;