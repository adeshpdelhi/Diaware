/*
'use strict';
angular.module('App')
.controller('OtaController',['$scope','patientFactory','choosePatientFactory','patient','appointmentFactory','centreDetails','authorize',function($scope,patientFactory,choosePatientFactory,patient,appointmentFactory,centreDetails,authorize){
$scope.patient=null;
$scope.showbeds=false;
$scope.shift1beds=null;
$scope.shift2beds=null;
$scope.shift3beds=null;
$scope.shift4beds=null;
$scope.showalert_ota=false;

$scope.ota={
	centreId:null;
	patientId:null;
	date:null;
	shiftNumber:null;
	appointmentType:null;
	tmtMachine:null;
	oneTimeAppointment:false;
	 
}
patientFactory.getPatients(authorize.getCentre()).get({id:choosePatientFactory.getChosenPatient().id,fullDetails:true}).$promise.then(function(response){
        	$scope.patient = response;
			$scope.ota.centreId=authorize.getCentre();
			$scope.ota.patientId=patient.id;
			$scope.ota.tmtMachine=patient.type;
});
if($scope.appointmentType!=null && $scope.date!=null){
	$scope.showbeds=true;
}
$scope.make_ota=function(){
	
	//information of number of beds available in that shift of day of that machine of that appointment type
	$scope.shift1beds=;
	$scope.shift2beds=;
	$scope.shift3beds=;
	$scope.shift4beds=;
	$scope.ota.oneTimeAppointment=true;
	//day of week corresponding to date.
	appointmentFactory.getAppointments(centre).save($scope.ota).$promise.then(function(response){
					$scope.showalert_ota=true;
					$scope.message ="One Time Appointment Successful!";
					$scope.messageColor ='success';
				},function(response){
					$scope.showalert_ota=true;
					console.log(response);
					$scope.message ='Error: ' +response.status + " " + response.statusText+ "!";
					$scope.messageColor="danger";

				});
}
}
*/
