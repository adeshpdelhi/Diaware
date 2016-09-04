/*
'use strict';
angular.module('App')
.controller('OtaController',['$scope','patientFactory','choosePatientFactory','patient','appointmentFactory','centreDetails','authorize',function($scope,patientFactory,choosePatientFactory,patient,appointmentFactory,centreDetails,authorize){
$scope.patient=null;
$scope.beds=null;
$scope.showbeds=false;
$scope.shift1beds=null;
$scope.shift2beds=null;
$scope.shift3beds=null;
$scope.shift4beds=null;
$scope.showalert_ota=false;
$scope.correctshift=false;

$scope.ota={
	centreId:null;
	patientId:null;
	date:null;
	dayOfTheWeek:null;
	shiftNumber:null;
	appointmentType:null;
	tmtMachine:null;
	oneTimeAppointment:false;
	//faltu
	billingDone:null;
	monitoringDone:null;
	treatmentConsumptionAdded:null;
	processComplete:null;
	cancelled:null;
	allBillsCleared:null;
	billingRemarks:null;
	 
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
	$scope.ota.oneTimeAppointment=true;
	//no of beds
	appointmentFactory.getAvailableBeds(authorize.getCentre()).get({date:$scope.ota.date,appointmentType:$scope.ota.appointmentType
					,tmtOnMachine:$scope.ota.tmtMachine}).$promise.then(function(response){
						$scope.beds=response;
						
	$scope.shift1beds=$scope.beds.shift1;
	$scope.shift2beds=$scope.beds.shift2;
	$scope.shift3beds=$scope.beds.shift3;
	$scope.shift4beds=$scope.beds.shift4;
	
	});
	//dayOfTheWeek
	 var d= new Date($scope.ota.date);
	 var x = d.getDay();
	 var day=null;
	 if(x==0)day="Sunday";
	 else if(x==1)day="Monday";
	 else if(x==1)day="Tuesday";
	 else if(x==1)day="Wednesday";
	 else if(x==1)day="Thursday";
	 else if(x==1)day="Friday";
	 else if(x==1)day="Saturday";
	 
	 $scope.ota.dayOfTheWeek=day;
	
	//check if selected shift number has atleast one bed avalaible
	if($scope.ota.shiftNumber==1)
		if($scope.beds.shift1<=1)$scope.correctshift=true;
	else if($scope.ota.shiftNumber==2)
		if($scope.beds.shift2<=1)$scope.correctshift=true;
	else if($scope.ota.shiftNumber==3)
		if($scope.beds.shift3<=1)$scope.correctshift=true;
	else if($scope.ota.shiftNumber==4)
		if($scope.beds.shift4<=1)$scope.correctshift=true;
	
	//set error if beds not avalaibl in selected shift
	if(scope.correctshift==false)
		$scope.message="Beds not Available in selected Shift";
	else if(scope.correctshift==true)
	{
		$scope.message="";
		// save ota
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
}
*/