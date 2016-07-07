'use strict';
angular.module('App')
.controller('PanelController',['$scope','patientFactory','backendFactory', function($scope,patientFactory,backendFactory){
		if($scope.showPanel){
			$scope.newPatient_Panel = { 
				patientId: $scope.newpatient_basic.id,
				panelId:null, 
				panelPermissionDateFrom:null,
				panelPermissionDateTo:null,
				panelPermissionNumber:null,
				totalTmtsPermitted:null,
				totalTmtsRemaining:null,
				renewalDate:null,
				lastModifiedBy:null
			};
			backendFactory.getPanels().query(function(response){
				$scope.panels = response;
				console.log(response);
			});
			$scope.panelSave = function(){
				console.log($scope.newPatient_Panel);
				patientFactory.getPatientPanels().save($scope.newPatient_Panel);
			};
	}

}])
;