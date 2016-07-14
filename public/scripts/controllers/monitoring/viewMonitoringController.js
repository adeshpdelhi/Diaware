'use strict';
angular.module('App')
.controller('ViewMonitoringController',['$scope','patientFactory','monitoringChartFactory','authorize','chosenPatientId', function($scope, patientFactory,monitoringChartFactory,authorize,chosenPatientId){
      // monitoringChartFactory.getPreBasic(chosenPatientId).get()
	    $scope.chosenPatientId = chosenPatientId;
	    $scope.latest = function(){
		    monitoringChartFactory.getPreBasic(chosenPatientId).get({fullChartLatest:true}).$promise.then(function(response){
	        	$scope.patientChart = response;
	        });
		};
	    $scope.latest();

		$scope.listPrevCharts = function(){
			monitoringChartFactory.getPreBasic(chosenPatientId).query(function(response){
	        	$scope.prevChartsList = response;
	        });	
		};
		$scope.fetchThisChart = function(id){
			monitoringChartFactory.getPreBasic(chosenPatientId).get({
				preBasicId : id, 
				fullChart : true
			}).$promise.then(function(response){
				$scope.patientChart = response;
				console.log(response);
			},function(response){
				$scope.showAlert = true;
				$scope.message = "Error: "+ response.status+ " " + response.statusText;
			})
		};
		$scope.isEditable = function(){
			var today = new Date();
			var aptDate = new Date($scope.patientChart.monitoringDate);
			today.setHours(0,0,0,0,0);
			aptDate.setHours(0,0,0,0,0);
			if(today - aptDate > 2*24*60*60*1000)
				return false;
			else return true;
		};
		$scope.savePreBasic = function(){
			$scope.updatedPreBasic = true;
			$scope.patientChart.lastModifiedBy = authorize.getUsername();
			monitoringChartFactory.getPreBasic(chosenPatientId).update({
				preBasicId:$scope.patientChart.preBasicId
			},$scope.patientChart)
			.$promise.then(function(response){
				console.log(response);
			});	
		};
		$scope.savePreBasicMedical = function(){
			$scope.updatedPreBasicMedical = true;
			$scope.patientChart.monitoringChartPreBasicMedical.lastModifiedBy = authorize.getUsername();
			monitoringChartFactory.getPreBasicMedical(chosenPatientId).update({
				preBasicId:$scope.patientChart.monitoringChartPreBasicMedical.preBasicId
			},$scope.patientChart.monitoringChartPreBasicMedical)
			.$promise.then(function(response){
				console.log(response);
			});
		};
		$scope.savePreMachineFinalCheck = function(){
			$scope.updatedPreMachineFinalCheck = true;
			$scope.patientChart.monitoringChartPreMachineFinalCheck.lastModifiedBy = authorize.getUsername();
			monitoringChartFactory.getPreMachineFinalChecks(chosenPatientId).update({
				preBasicId:$scope.patientChart.monitoringChartPreMachineFinalCheck.preBasicId
			},$scope.patientChart.monitoringChartPreMachineFinalCheck)
			.$promise.then(function(response){
				console.log(response);
			});	
		};
		$scope.savePreAccessAssessment = function(){
			$scope.updatedPreAccessAssessment = true;
			$scope.patientChart.monitoringChartPreAccessAssessment.lastModifiedBy = authorize.getUsername();
			monitoringChartFactory.getPreAccessAssessments(chosenPatientId).update({
				preBasicId:$scope.patientChart.monitoringChartPreAccessAssessment.preBasicId
			},$scope.patientChart.monitoringChartPreAccessAssessment)
			.$promise.then(function(response){
				console.log(response);
			});	
		};
		$scope.savePreAssessment = function(){
			$scope.updatedPreAssessment = true;
			$scope.patientChart.monitoringChartPreAssessment.lastModifiedBy = authorize.getUsername();
			monitoringChartFactory.getPreAssessments(chosenPatientId).update({
				preBasicId:$scope.patientChart.monitoringChartPreAssessment.preBasicId
			},$scope.patientChart.monitoringChartPreAssessment)
			.$promise.then(function(response){
				console.log(response);
			});	
		};
		$scope.saveIntra = function(){
			$scope.updateIntra = true;
			for(var i = 0; i < $scope.patientChart.monitoringChartIntra.length; i++ ){
				$scope.patientChart.monitoringChartIntra[i].lastModifiedBy = authorize.getUsername();
				
				monitoringChartFactory.getIntra(chosenPatientId)
				.update({
					intraId : $scope.patientChart.monitoringChartIntra[i].intraId, 
					entryNumber : $scope.patientChart.monitoringChartIntra[i].entryNumber
				},$scope.patientChart.monitoringChartIntra[i])
				.$promise.then(function(response){
					console.log(response);
				});	
			}
		};
		$scope.savePost = function(){
			$scope.updatedPost = true;
			$scope.patientChart.monitoringChartPost.lastModifiedBy = authorize.getUsername();

			monitoringChartFactory.getPost(chosenPatientId).update({
				postId:$scope.patientChart.monitoringChartPost.postId
			},$scope.patientChart.monitoringChartPost)
			.$promise.then(function(response){
				console.log(response);
			});
		};

		// $scope.edit_postdialysis = function(){
		// 	$scope.editingPost = true;
			
		// };

		// $scope.edit_intradialysis = function(){
			
		// };
		// $scope.edit_predialysis_access_accessment = function(){
			
		// };
		// $scope.edit_predialysis_accessment = function(){
			
		// };
		// $scope.edit_predialysis_machine_final_check = function(){
			
		// };

		// $scope.edit_predialysis_basic_medical = function(){
				
		// };

		// $scope.edit_predialysis_basic = function(){
			
		// };
    }])
;