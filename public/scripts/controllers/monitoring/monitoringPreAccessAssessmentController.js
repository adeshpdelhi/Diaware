'use strict';
angular.module('App')
.controller('MonitoringPreAccessAssessmentController',['$scope','authorize','backendFactory','monitoringChartFactory', function($scope,authorize,backendFactory,monitoringChartFactory){$scope.accessAssessment = {
		preBasicId:null,
		bruit:null,
		anyAbnormality:null,
		signOfAccessInfection:null,
		cannulation:null,
		centralLineStatus:null,
		commencedBy:null,
		assistedBy:null,
		lastModifiedBy:null
	};
	$scope.saveAccessAssessment = function(){
		$scope.accessAssessment.patientId = $scope.basic.patientId;
		$scope.accessAssessment.preBasicId = $scope.basic.preBasicId;
		$scope.accessAssessment.lastModifiedBy = authorize.getUsername();
		console.log($scope.accessAssessment);
		monitoringChartFactory.getPreAccessAssessments($scope.basic.preBasicId).save($scope.accessAssessment);
	};

}])
;