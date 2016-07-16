'use strict';
angular.module('App')
.controller('ViewMonitoringController',['$scope','patientFactory','monitoringChartFactory','authorize','chosenPatientId', function($scope, patientFactory,monitoringChartFactory,authorize,chosenPatientId){
      // monitoringChartFactory.getPreBasic(chosenPatientId).get()
	    $scope.chosenPatientId = chosenPatientId;
	    $scope.latest = function(){
		    monitoringChartFactory.getPreBasic(chosenPatientId).get({fullChartLatest:true}).$promise.then(function(response){
	        	$scope.patientChart = response;
	        	$scope.post = $scope.patientChart.monitoringChartPost;
	        	$scope.intraTable = $scope.patientChart.monitoringChartIntras;
	        	console.log($scope.intraTable.length + "ggggggggggggggggggggggggggggggggggggggggggs");	
	        	$scope.accessAssessment = $scope.patientChart.monitoringChartPreAccessAssessment;	
	        	$scope.assessment = $scope.patientChart.monitoringChartPreAssessment;
	        	$scope.machineCheck = $scope.patientChart.monitoringChartPreMachineFinalCheck;
	        	$scope.basicMedical = $scope.patientChart.monitoringChartPreBasicMedical;
	        	$scope.patientChart.monitoringDate = new Date($scope.patientChart.monitoringDate);
	        	$scope.basic = $scope.patientChart;	
	        });
		};
	    $scope.latest();
	    $scope.view = true;
	    console.log("inside ViewMonitoringController");
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
		$scope.$watch('patientChart',function (newVal,oldVal) {
			if(!$scope.patientChart) $scope.isEditable();
		});
		$scope.isEditable = function(){
			// if($scope.patientChart) return false;
			var aptDate;
			aptDate = new Date($scope.patientChart.monitoringDate);			
			var today = new Date();
			today.setHours(0,0,0,0,0);
			aptDate.setHours(0,0,0,0,0);
			if(today - aptDate > 2*24*60*60*1000)
				return false;
			else return true;					
		};
		$scope.updatePreBasic = function(){
			$scope.updatedPreBasic = true;
			$scope.editingPreBasic = false;
			$scope.patientChart.lastModifiedBy = authorize.getUsername();
			monitoringChartFactory.getPreBasic(chosenPatientId).update({
				preBasicId:$scope.patientChart.preBasicId
			},$scope.patientChart)
			.$promise.then(function(response){
				console.log(response);
			});	
		};
		
		$scope.updateParentValues = function(editing,alert,message,value){
			if(value == 2){
				$scope.editingPreBasicMedical = editing;
				$scope.updatedPreBasicMedical = alert;
				$scope.message = message;
			}
			if(value == 3){
				$scope.editingPreMachineFinalCheck = editing;
				$scope.updatedPreMachineFinalCheck = alert;
				$scope.message = message;
			}
			if(value == 4){
				$scope.editingPreAccessAssessment = editing;
				$scope.updatedPreAccessAssessment = alert;
				$scope.message = message;
			}
			if(value == 5){
				$scope.editingPreAssessment = editing;
				$scope.updatedPreAssessment = alert;
				$scope.message = message;
			}
			if(value == 6){
				$scope.editingPost = editing;
				$scope.updatedPost = alert;
				$scope.message = message;
			}
			if(value == 7){
				$scope.editingIntra = editing;
				$scope.updatedIntra = alert;
				$scope.message = message;
			}
		} ;
		
		// $scope.$watch('patientChart.patientId',function (newVal,oldVal) {
		// 	if($scope.patientChart){
				
		// 	}
		// });
		
		$scope.editing_postdialysis = function(){
			$scope.editingPost = true;
		};

		$scope.editing_intradialysis = function(){
			$scope.editingIntra = true;
			console.log("entered");
		};
		$scope.editing_predialysis_access_accessment = function(){
			$scope.editingPreAccessAssessment = true;
		};
		$scope.editing_predialysis_assessment = function(){
			$scope.editingPreAssessment = true;
			console.log($scope.assessment);
		};
		$scope.editing_predialysis_machine_final_check = function(){
			$scope.editingPreMachineFinalCheck = true;
		};

		$scope.editing_predialysis_basic_medical = function(){
			$scope.editingPreBasicMedical = true;
		};

		$scope.editing_predialysis_basic = function(){
			$scope.editingPreBasic = true;
			
		};
    }])
;