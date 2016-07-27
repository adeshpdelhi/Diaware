'use strict';
angular.module('App')
.controller('MonitoringPreAccessAssessmentController',['$scope','authorize','backendFactory','monitoringChartFactory', function($scope,authorize,backendFactory,monitoringChartFactory){
	if(!$scope.view || ($scope.patientChart != null  && !$scope.accessAssessment)){
		$scope.accessAssessment = {
			preBasicId:null,
			bruit:null,
			anyAbnormality:null,
			signOfAccessInfection:null,
			cannulation:null,
			centralLineStatus:null,
			commencedBy:null,
			assistedBy:null,
			lastModifiedBy:null,
			new:true
		};
	}
	$scope.showalert_predialysis_access_assessment=false;
	$scope.savedOnce=false;
	$scope.saveAccessAssessment = function(){
		$scope.accessAssessment.patientId = $scope.basic.patientId;
		$scope.accessAssessment.preBasicId = $scope.basic.preBasicId;
		$scope.accessAssessment.lastModifiedBy = authorize.getUsername();
		console.log($scope.accessAssessment);
		monitoringChartFactory.getPreAccessAssessments($scope.basic.patientId).save($scope.accessAssessment).$promise.then(function(response){
			$scope.showalert_predialysis_access_assessment=true;
			$scope.message = "Saved Successfully!";
			$scope.messageColor = 'success';
			$scope.savedOnce=true;
			},function(response){
				$scope.showalert_predialysis_access_assessment=false;
				$scope.message = "Error: " + response.status + " " + response.statusText+"!";
				$scope.messageColor='danger';
				console.log(response);
			});
		//$scope.showalert_predialysis_access_assessment=true;

	};

		$scope.updatePreAccessAssessment = function(){
			$scope.updatedPreAccessAssessment = true;
			$scope.accessAssessment.lastModifiedBy = authorize.getUsername();
			if(!$scope.accessAssessment.new){
				monitoringChartFactory.getPreAccessAssessments($scope.patientChart.patientId).update({
					preBasicId:$scope.accessAssessment.preBasicId
				},$scope.accessAssessment)
				.$promise.then(function(response){
					console.log(response);
					$scope.updateParentValues(false,true,"Updated Successfully!",4,'success');
				},function(response){
					$scope.updateParentValues(false,true,"Error: " + response.status + " " + response.statusText+"!",4);
				});
			}else{
				$scope.accessAssessment.patientId = $scope.patientChart.patientId;
				$scope.accessAssessment.preBasicId = $scope.patientChart.preBasicId;
				console.log($scope.accessAssessment);
				monitoringChartFactory.getPreAccessAssessments($scope.patientChart.preBasicId).save($scope.accessAssessment).$promise.then(function(response){
						console.log(response);
						$scope.updateParentValues(false,true,"Updated Successfully!",4);
					},function(response){
						$scope.updateParentValues(false,true,"Error: " + response.status + " " + response.statusText+"!",4,'danger');
						
					});	
					
			}
		};

}])
;