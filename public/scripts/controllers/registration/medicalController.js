'use strict';
angular.module('App')
.controller('MedicalController',['$scope','patientFactory','authorize','backendFactory', function($scope,patientFactory,authorize,backendFactory){
	$scope.savedOnce = false;
    var diseases = [];
	if(!$scope.view || ( $scope.patient != null && (!$scope.newPatient_Medical || $scope.newPatient_Medical.length == 0)) ){
		$scope.newPatient_Medical = [];
		backendFactory.getDiseases().query(function(response){
			diseases = response;
 			for(var i = 0; i < diseases.length;i++){
 				var medicalHistory= {
 					patientId:null,
 					diseaseName:diseases[i].diseaseName,
 					diseasePresent:null,
 					doctorComments:null,
 					lastModifiedBy:null,
 					new:true
 				};
 				$scope.newPatient_Medical.push(medicalHistory);
 			}
 		});	
		$scope.others = [];
	}
	$scope.showalert_medical=false;
	$scope.showalert_medicalnew=false;
	
	$scope.other = {
		patientId:$scope.view?$scope.patient.id:$scope.newpatient_basic.id,
		diseaseName:null,
		diseasePresent:"Yes",
		doctorComments:null,
		lastModifiedBy:null,
		new:true
	};
	$scope.addOthers = function(){
		if($scope.other.diseaseName==null || $scope.other.diseaseName.length ==0)
		{
			$scope.showalert_medicalnew=true;
			$scope.messagenew="Enter disease name";
			$scope.messageNewColor = 'danger';
			return;
		}
		$scope.showalert_medical=false;
		$scope.showalert_medicalnew=false;
		$scope.other.patientId = $scope.view?$scope.patient.id:$scope.newpatient_basic.id;
		$scope.other.lastModifiedBy = authorize.getUsername();
		$scope.newPatient_Medical.push($scope.other);
		$scope.other = {
			patientId:$scope.newpatient_basic,
			diseaseName:null,
			diseasePresent:"Yes",
			doctorComments:null,
			lastModifiedBy:null,
			new:true
		};
		$scope.otherForm.$setPristine();
	}
	$scope.saveMedical = function(){
		$scope.showalert_medical=false;
		for(var i = 0; i< $scope.newPatient_Medical.length;i++){
			$scope.newPatient_Medical[i].patientId = $scope.newpatient_basic.id;
			$scope.newPatient_Medical[i].lastModifiedBy = authorize.getUsername();
			console.log($scope.newPatient_Medical[i]);
			patientFactory.getPatientMedicalHistory($scope.newPatient_Medical[i].patientId,authorize.getCentre())
			.save($scope.newPatient_Medical[i]).$promise
			.then(function(response){
				$scope.message = "Details Saved Successfully!";
				$scope.messageColor = 'success';
				$scope.savedOnce = true;
			},function(response){
				$scope.message = "Error: " + response.status + " " + response.statusText;
				$scope.messageColor = 'danger';
				console.log(response);
			});
			$scope.showalert_medical = true;
		}
	};
	$scope.updateMedical = function(){
		$scope.showalert_medical=false;
		for(var i = 0; i< $scope.newPatient_Medical.length;i++){
			if($scope.newPatient_Medical[i].new)
				$scope.newPatient_Medical[i].patientId = $scope.patient.id;
			$scope.newPatient_Medical[i].lastModifiedBy = authorize.getUsername();
			console.log($scope.newPatient_Medical[i]);
			if($scope.newPatient_Medical[i].new){
				patientFactory.getPatientMedicalHistory($scope.newPatient_Medical[i].patientId,authorize.getCentre())
				.save($scope.newPatient_Medical[i]).$promise
				.then(function(response){
					$scope.message = "Details Saved Successfully!";
					$scope.messageColor = 'success';
					$scope.updateMyValuesFromMedical(false, true,$scope.message);
					
					// $scope.showalert_medical = true;
				},function(response){
					$scope.message = "Error: " + response.status + " " + response.statusText;
					$scope.messageColor = 'danger';
					console.log(response);
					$scope.updateMyValuesFromMedical(false, true,$scope.message);

					// $scope.showalert_medical = true;
				});	
			}
			else{
				patientFactory.getPatientMedicalHistory($scope.newPatient_Medical[i].patientId,authorize.getCentre())
				.update({diseaseName:$scope.newPatient_Medical[i].diseaseName},$scope.newPatient_Medical[i]).$promise
				.then(function(response){
					$scope.message = "Details Saved Successfully!";
					$scope.messageColor = 'success';
					// $scope.showalert_medical = true;
					$scope.updateMyValuesFromMedical(false, true,$scope.message);

				},function(response){
					$scope.message = "Error: " + response.status + " " + response.statusText;
					$scope.messageColor = 'danger';
					console.log(response);
					// $scope.showalert_medical = true;
					$scope.updateMyValuesFromMedical(false, true,$scope.message);

				});
			}
			
		};

	};
	$scope.regularForm =function(str){
		return str.replace(/([A-Z])/g, ' $1').replace(/[^.]/, function(str){ return str.toUpperCase(); });
	};
	


}])
;
