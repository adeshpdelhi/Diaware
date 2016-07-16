'use strict';
angular.module('App')
.controller('PanelController',['$scope','patientFactory','backendFactory','authorize', function($scope,patientFactory,backendFactory,authorize){
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
			console.log("yes");
		}
		$scope.showalert_panel=false;
		backendFactory.getPanels().query(function(response){
			$scope.panels = response;
			console.log(response);
		});
		$scope.updatePanels = function(){
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
			},function(response){
				$scope.showalert_panel=false;
				console.log(response);
			}
			
			);
			//$scope.showalert_panel=true;
		};

}])
;