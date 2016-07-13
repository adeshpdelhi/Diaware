'use strict';
angular.module('App')
.controller('MonitoringPreBasicMedicalController' ,['$scope','authorize','backendFactory','monitoringChartFactory', function($scope,authorize,backendFactory,monitoringChartFactory){
	$scope.basicMedical ={
		preBasicId: null,
		dialyzerName: null,
		dialyzerType: null,
		accessUsed: null,
		centralLineCreated: null,
		centralLine: null,
		anticoagulant: null,
		bolusAmount: null,
		hourlyHeparin:null,
		heparinStopBefore: null,
		NSFlushingFrequency: null,
		NSFlushingVolume: null,
		lastModifiedBy: null
	};
	$scope.showalert_predialysis_basic_medical=false;
	$scope.showCentralLine = false;
	backendFactory.getCentres().get({id:authorize.getCentre()}).$promise.then(function(response){
		$scope.accessLinesAvailable = response.accessLinesAvailable;
	})
	$scope.saveBasicMedical = function(){
		$scope.basicMedical.patientId = $scope.basic.patientId;
		$scope.basicMedical.preBasicId = $scope.basic.preBasicId;
		$scope.basicMedical.lastModifiedBy = authorize.getUsername();
		console.log($scope.basicMedical);
		monitoringChartFactory.getPreBasicMedicals($scope.basic.patientId).save($scope.basicMedical).$promise.then(function(response){
			$scope.showalert_predialysis_basic_medical=true;
			},function(response){
				$scope.showalert_predialysis_basic_medical=false;
				console.log(response);
			}
			
			);
		//$scope.showalert_predialysis_basic_medical=true;
	};
}])
;