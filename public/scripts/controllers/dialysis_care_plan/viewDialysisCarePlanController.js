'use strict';
angular.module('App')
.controller('ViewDialysisCarePlanController',['$scope','patientFactory','choosePatientFactory', 'authorize','backendFactory', function($scope,patientFactory,choosePatientFactory,authorize,backendFactory){
	
		backendFactory.getCentres().get({id:authorize.getCentre()}).$promise.then(function(response){
			$scope.accessLinesAvailable = response.accessLinesAvailable;	
		});
		backendFactory.getDialyzateTypes().query(function(response){
			$scope.dialyzateTypes = response;
		});
		$scope.view = true;
		$scope.chosenPatientId = choosePatientFactory.getChosenPatient().id;
		patientFactory.getPatientCarePlans(choosePatientFactory.getChosenPatient().id,authorize.getCentre()).get({latestPlan:true})
		.$promise.then(function(response){
			console.log("eth")
			console.log(response );
        	if(!response.patientDetail){
        		console.log("i m in here ! :D")
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
					lastModifiedBy: null,
					new:true
		        };
		        patientFactory.getPatients(authorize.getCentre()).get({id:$scope.chosenPatientId})
		        .$promise.then(function(response){
		        	$scope.patient = response;
		        	console.log($scope.patient+ " iiii");
		        });
	        }else{
	        	console.log("ehy m i in here");
	       		$scope.carePlan = response;
	       		$scope.carePlan.prescriptionDate = new Date($scope.carePlan.prescriptionDate);
	        	$scope.patient = response.patientDetail;
	        }
        });
        console.log("heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
        console.log($scope.patient);
        console.log($scope.carePlan);
        console.log("end");
        $scope.updateCarePlan = function() {
        	$scope.carePlan.lastModifiedBy = authorize.getUsername();
        	if($scope.carePlan.new){
        		$scope.carePlan.patientId = $scope.chosenPatientId;
	        	console.log("id "+ $scope.carePlan.patientId);
	        	patientFactory.getPatientCarePlans($scope.carePlan.patientId, authorize.getCentre()).save($scope.carePlan)
	        	.$promise.then(function(response){
					$scope.editCarePlan = false;
					$scope.updatedCarePlan = true;
					$scope.message = "Updated Successfully!";
				},function(response){
					$scope.editCarePlan = false;
					$scope.updateCarePlan = true;
					$scope.message = "Error: "+ response.status+ " "+ response.statusText+"!";
				});	
        	}else{
        		patientFactory.getPatientCarePlans($scope.carePlan.patientId, authorize.getCentre()).update({
        			carePlanId:$scope.carePlan.carePlanId
        		},$scope.carePlan)
        		.$promise.then(function(response){
					$scope.editCarePlan = false;
					$scope.updatedCarePlan = true;
					$scope.message = "Updated Successfully!";
				},function(response){
					$scope.editCarePlan = false;
					$scope.updateCarePlan = true;
					$scope.message = "Error: "+ response.status+ " "+ response.statusText+"!";
				});
        	}
        };

			

}])
;