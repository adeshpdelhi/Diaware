'use strict';
angular.module('App')
.controller('MonitoringPreAssessmentController',['$scope','authorize','backendFactory','monitoringChartFactory', function($scope,authorize,backendFactory,monitoringChartFactory){
	$scope.assessment = {
		preBasicId:null,
		preHDWeight:0,
		lastPostHDWeight:0,
		weightGain:0,
		dryWeight:0,
		targetWeightLoss:0,
		physicalChestPain:null,
		chestAuscultation:null,
		recentSurgery:null,
		peripheralOedema:null,
		respiratoryStatus:null,
		temperature:null,
		pulse:null,
		BPSitting:null,
		BPStanding:null,
		breakfastLunchDinner:null,
		subjectiveStatement:null,
		interdialyticComplaints:null,
		ambulatoryStatus:null,
		hypotension:null,
		headache:null,
		cramps:null,
		vomiting:null,
		fever:null,
		rigor:null,
		rash:null,
		chest:null,
		other:null,
		dyspnea:null,
		pruritus:null,
		generalComments:null,
		lastModifiedBy:null
	};
	$scope.showalert_predialysis_assessment=false;
    $scope.$watch('assessment.preHDWeight',function(newVal1, oldval1){
			$scope.$watch('assessment.lastPostHDWeight',function(newVal2,oldval2){
				console.log(newVal1 +" " + newVal2);
				$scope.assessment.weightGain = newVal1-newVal2;
				$scope.preHDWeight = $scope.assessment.preHDWeight;
			});
			$scope.$watch('assessment.dryWeight',function(newVal3,oldval3){
				console.log(newVal1 + ' '+ newVal3);
				$scope.assessment.targetWeightLoss = newVal1 - newVal3;
			});
		});
	// };
	$scope.saveAssessment = function(){
		$scope.assessment.patientId = $scope.basic.patientId;
		$scope.assessment.preBasicId = $scope.basic.preBasicId;
		$scope.assessment.lastModifiedBy = authorize.getUsername();
		console.log($scope.assessment);
		monitoringChartFactory.getPreAssessments($scope.basic.preBasicId).save($scope.assessment).$promise.then(function(response){
			$scope.showalert_predialysis_assessment=true;
			},function(response){
				$scope.showalert_predialysis_assessment=false;
				console.log(response);
			}
			
			);;
		//$scope.showalert_predialysis_assessment=true;

	};
}])
;