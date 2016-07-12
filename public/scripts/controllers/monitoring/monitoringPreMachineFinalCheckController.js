'use strict';
angular.module('App')
.controller('MonitoringPreMachineFinalCheckController',['$scope','authorize','backendFactory','monitoringChartFactory', function($scope,authorize,backendFactory,monitoringChartFactory){
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
		lastModifiedBy:null
	};
	$scope.saveMachineCheck = function(){
		$scope.machineCheck.patientId = $scope.basic.patientId;
		$scope.machineCheck.preBasicId = $scope.basic.preBasicId;
		$scope.machineCheck.lastModifiedBy = authorize.getUsername();
		$scope.machineCheck.machineNumber = $scope.basic.machineNumber;
		console.log($scope.machineCheck);
		monitoringChartFactory.getPreMachineFinalChecks($scope.basic.preBasicId).save($scope.machineCheck);
	}
}])
;