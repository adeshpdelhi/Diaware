'use strict';
angular.module('App')
.controller('ViewRegistrationController',['$scope','patientFactory','choosePatientFactory','authorize','regularForm', function($scope, patientFactory, choosePatientFactory,authorize, regularForm){
	var centre = authorize.getCentre();
    $scope.centreInvalidToSubmit = false;
    if(centre == 'all'){
    	console.log("centreInvalidToSubmit:" + $scope.centreInvalidToSubmit);
    	$scope.centreInvalidToSubmit = true;
    }
	$scope.regularForm = regularForm.regularForm;
        patientFactory.getPatients(authorize.getCentre()).get({id:choosePatientFactory.getChosenPatient().id,fullDetails:true}).$promise.then(function(response){
        	$scope.patient = response;
			$scope.newPatient_Medical = $scope.patient.medicalHistories;
        	$scope.newpatient_basic = $scope.patient;
			$scope.newpatient_basic.DOB = new Date ( $scope.newpatient_basic.DOB);
        	console.log($scope.patient);
        	$scope.events = $scope.patient.majorClinicalEvents;
        	console.log($scope.events);
        	for(var i = 0; i < $scope.events.length; i++){
        		$scope.events[i].saved = true;
        		$scope.events[i].ID = i;
        	}
			$scope.newPatient_Others = $scope.patient.otherDetail;
			$scope.newPatient_Panel = $scope.patient.panelDetail;
			

        });
        $scope.setAge = function(){
			console.log("received dob");
			console.log($scope.newpatient_basic.DOB);
			// var dobyear = $scope.newpatient_basic.DOB.getFullYear();
			var dob = new Date($scope.newpatient_basic.DOB);
			console.log("date dob");

			console.log(dob);
			var today = new Date();
			console.log("today");

			console.log(today);
			$scope.newpatient_basic.age = 0;
			if(today.getYear() > dob.getYear()){
				$scope.newpatient_basic.age = today.getYear() - dob.getYear();		
				if(today.getMonth() < dob.getMonth()){
					$scope.newpatient_basic.age--;		
				}else{
					if(today.getDate() < dob.getDate())
						$scope.newpatient_basic.age--;		
				}
			}
		};
		$scope.myDate = new Date()
		$scope.maxDate = new Date(
			$scope.myDate.getFullYear(),
			$scope.myDate.getMonth(),
			$scope.myDate.getDate());

		$scope.edit=false;
		$scope.editBasicDetails = function(){
			$scope.editBasic = true;
		};
		$scope.view = true;
		$scope.updateBasicDetails = function(){
			$scope.newpatient_basic.lastModifiedBy = authorize.getUsername();
			$scope.patient = $scope.newpatient_basic;
			patientFactory.getPatients(authorize.getCentre()).update({
				id:$scope.newpatient_basic.id
			},$scope.newpatient_basic).
			$promise.then(function(response){
				$scope.showAlert = true;
				$scope.message = "Updated Patient Basic Details Successfully";
				$scope.messageColor = 'success';
				$scope.editBasic = false;
			},function(response){
				console.log(response);
				$scope.messageColor='danger';
				$scope.message="Error: " + response.status + ' ' + response.statusText+ "!";
			});
		
		};
		$scope.editClinicalEvents = function(){
			$scope.editClinical = true;
			
		};
		// $scope.$watch =
		$scope.updateMyValuesFromClinical = function(editClinical, alert,message,messageColor){
			$scope.editClinical = editClinical;
			$scope.showAlertClinical = alert;
			$scope.message = message;
			$scope.messageColor = messageColor;
		};

		$scope.editMedicalHistory = function(){
			$scope.editMedical = true;
		};	

		$scope.updateMyValuesFromMedical = function(editMedical, alert,message,messageColor){
			$scope.editMedical = editMedical;
			$scope.showAlertMedical = alert;
			$scope.message = message;
			$scope.messageColor = messageColor;
		};
		$scope.editOtherDetails = function(){
			$scope.editOthers = true;
		};

		$scope.updateMyValuesFromOthers = function(editOthers, alert,message,messageColor){
			$scope.editOthers = editOthers;
			$scope.showAlertOther = alert;
			$scope.message = message;
			$scope.messageColor = messageColor;
		};
		$scope.editPanel = function(){
			$scope.editPanels = true;
		};
		$scope.updateMyValuesFromPanel = function(editPanels, alert,message,messageColor){
			$scope.editPanels = editPanels;
			$scope.showAlertPanel = alert;
			$scope.messageColor = messageColor;
			$scope.message = message;
		};

		
    }])
;