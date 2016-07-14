'use strict';
angular.module('App')
.controller('PanelController',['$scope','patientFactory','backendFactory','authorize', function($scope,patientFactory,backendFactory,authorize){
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
		$scope.showalert_panel=false;
		backendFactory.getPanels().query(function(response){
			$scope.panels = response;
			console.log(response);
		});
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