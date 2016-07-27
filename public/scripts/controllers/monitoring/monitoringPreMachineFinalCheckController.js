'use strict';
angular.module('App')
.controller('MonitoringPreMachineFinalCheckController',['$scope','authorize','backendFactory','monitoringChartFactory', function($scope,authorize,backendFactory,monitoringChartFactory){
	if(!$scope.view || ($scope.patientChart != null && !$scope.machineCheck)){
		$scope.machineCheck = {
			preBasicId:null,
			machineNumber:null,
			machineTestPassed:null,
			machineTestCheckedBy:null,
			airDetector:null,
			alarmLimits:null,
			dialysateFlowRate:null,
			dialysisCounterCurrentFlow:null,
			dialysateTemperature:null,
			conductivity:null,
			partAConcentrationCombination:null,
			lastModifiedBy:null,
			new:true
		};
	}
	$scope.showalert_predialysis_machine_final_check=false;
	$scope.savedOnce=false;
	$scope.saveMachineCheck = function(){
		$scope.machineCheck.patientId = $scope.basic.patientId;
		$scope.machineCheck.preBasicId = $scope.basic.preBasicId;
		$scope.machineCheck.lastModifiedBy = authorize.getUsername();
		$scope.machineCheck.machineNumber = $scope.basic.machineNumber;
		console.log($scope.machineCheck);
		monitoringChartFactory.getPreMachineFinalChecks($scope.basic.patientId).save($scope.machineCheck).$promise.then(function(response){
			$scope.showalert_predialysis_machine_final_check=true;
			$scope.message = 'Successfully Saved Details!';
			$scope.messageColor = 'success';
			$scope.savedOnce=true;
			},function(response){
				$scope.showalert_predialysis_machine_final_check=true;
				console.log(response);
				$scope.messageColor='danger';
				$scope.message="Error: "+ response.status+ " " +response.statusText+"!";
				
			});
		//$scope.showalert_predialysis_machine_final_check=true;
	};;
	$scope.updatePreMachineFinalCheck = function(){
			$scope.updatedPreMachineFinalCheck = true;
			$scope.machineCheck.lastModifiedBy = authorize.getUsername();
			if(!$scope.machineCheck.new){
				monitoringChartFactory.getPreMachineFinalChecks($scope.patientChart.patientId).update({
					preBasicId:$scope.machineCheck.preBasicId
				},$scope.machineCheck)
				.$promise.then(function(response){
					console.log(response);
					$scope.updateParentValues(false,true,"Updated Successfully!",3,'success');
				},function(response){
					$scope.updateParentValues(false,true,"Error: "+ response.status + " " +response.statusText+"!",3,'danger');
				});	
			}
			else{
				$scope.machineCheck.patientId = $scope.patientChart.patientId;
				$scope.machineCheck.preBasicId = $scope.patientChart.preBasicId;
				$scope.machineCheck.machineNumber = $scope.patientChart.machineNumber;				
				monitoringChartFactory.getPreMachineFinalChecks($scope.patientChart.patientId).save($scope.machineCheck).$promise.then(function(response){
						console.log(response);
						$scope.updateParentValues(false,true,"Updated Successfully!",3,'success');
					},function(response){
						$scope.updateParentValues(false,true,"Error: "+ response.status + " " +response.statusText+"!",3,'danger');
					});
			}

		};

}])
;