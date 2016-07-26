'use strict';
angular.module('App')
.controller('PanelController',['$scope','patientFactory','backendFactory','authorize','regularForm', function($scope,patientFactory,backendFactory,authorize, regularForm){
		$scope.regularForm = regularForm.regularForm;
		$scope.savedOnce = false;
		if(!$scope.view || (!$scope.newPatient_Panel && $scope.patient != null)){
			$scope.newPatient_Panel = { 
				patientId: $scope.view?$scope.patient.id:$scope.newpatient_basic.id,
				panelId:null, 
				panelPermissionDateFrom:null,
				panelPermissionDateTo:null,
				panelPermissionNumber:null,
				totalTmtsPermitted:null,
				totalTmtsRemaining:null,
				renewalDate:null,
				lastModifiedBy:null,
				new:true
			};	
			if($scope.newPatient_Panel!=null && $scope.newPatient_Panel.panelId!=null)
				backendFactory.getPanels().get({panelId:$scope.newPatient_Panel.panelId}).$promise.then(function(response){
					$scope.newPatient_Panel.panelName=response.name;
				});
			console.log("yes");
		}
		$scope.$watch('newPatient_Panel.panelId',function(newVal,oldval){
			if(newVal){
				backendFactory.getPanels().get({panelId:$scope.newPatient_Panel.panelId}).$promise.then(function(response){
					$scope.newPatient_Panel.panelName=response.name;
				});
			}
		});
		$scope.showalert_panel=false;
		backendFactory.getPanels().query(function(response){
			$scope.panels = response;
			console.log(response);
		});
		$scope.updatePanels = function(){
			console.log('value of panel '+$scope.newPatient_Panel.panelId);
			$scope.newPatient_Panel.lastModifiedBy = authorize.getUsername();
			if(!$scope.newPatient_Panel.new){
				patientFactory.getPatientPanels($scope.newPatient_Panel.patientId,authorize.getCentre()).update($scope.newPatient_Panel)
				.$promise.then(function(response){
					console.log(response);
					$scope.updateMyValuesFromPanel(false,true,"Successfully Updated!");
				},function(response){
					$scope.updateMyValuesFromPanel(false,true,"Error: " + response.status+ " "+ response.statusText + "!");
				});
			}else{
				$scope.newPatient_Panel.patientId = $scope.patient.id; 
				console.log($scope.newPatient_Panel);
				patientFactory.getPatientPanels($scope.newPatient_Panel.patientId,authorize.getCentre()).save($scope.newPatient_Panel)
				.$promise.then(function(response){
					console.log(response);
					$scope.updateMyValuesFromPanel(false,true,"Successfully Updated!");
				},function(response){
					$scope.updateMyValuesFromPanel(false,true,"Error: " + response.status+ " "+ response.statusText + "!");
				});
	
			}
		};
		$scope.panelSave = function(){
			$scope.newPatient_Panel.lastModifiedBy = $scope.newpatient_basic.lastModifiedBy;
			$scope.newPatient_Panel.patientId = $scope.newpatient_basic.id; 
			console.log($scope.newPatient_Panel);
			patientFactory.getPatientPanels($scope.newPatient_Panel.patientId,authorize.getCentre()).save($scope.newPatient_Panel).$promise.then(function(response){
				$scope.showalert_panel=true;
				$scope.savedOnce = true;
			},function(response){
				$scope.showalert_panel=false;
				console.log(response);
			}
			
			);
			//$scope.showalert_panel=true;
		};

}])
;