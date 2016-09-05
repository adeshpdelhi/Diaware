'use strict';
angular.module('App')
.controller('OtaController',['$scope','patientFactory','choosePatientFactory','appointmentFactory','centreDetails','authorize',function($scope,patientFactory,choosePatientFactory,appointmentFactory,centreDetails,authorize){
	$scope.patient=null;
	$scope.beds=null;
	$scope.showbeds=false;
	$scope.shift1beds=null;
	$scope.shift2beds=null;
	$scope.shift3beds=null;
	$scope.shift4beds=null;
	$scope.shift5beds=null;
	$scope.shift6beds=null;
	$scope.showalert_ota=false;
	$scope.correctshift=false;

	$scope.ota={
		centreId:null,
		patientId:null,
		date:null,
		dayOfTheWeek:null,
		shiftNumber:null,
		appointmentType:null,
		tmtMachine:null,
		oneTimeAppointment:true,
		//faltu
	billingDone:null,
	monitoringDone:null,
	treatmentConsumptionAdded:null,
	processComplete:null,
	cancelled:null,
	allBillsCleared:null,
	billingRemarks:null

	};

	/*$scope.shift1beds=3;
	$scope.shift2beds=1;
	$scope.shift3beds=0;
 	$scope.shift4beds=2;
*/
	$scope.$watch('ota.date',function(newVal,oldVal){

		if(newVal){
			console.log('hereeeeeeee');
			$scope.showbeds=true;
			appointmentFactory.getAvailableBeds(authorize.getCentre()).get({date:$scope.ota.date,appointmentType:$scope.ota.appointmentType,tmtOnMachine:$scope.ota.tmtMachine}).$promise.then(function(response){
				$scope.beds=response;
				console.log('in here');
				for(key in $scope.beds){
					console.log('here: key is '+key);
						 console.log(key);
						$scope.shift1beds = $scope.beds[key].shift1;
						$scope.shift2beds = $scope.beds[key].shift2;
						$scope.shift3beds = $scope.beds[key].shift3;
						$scope.shift4beds = $scope.beds[key].shift4;
						$scope.shift5beds = $scope.beds[key].shift5;
						$scope.shift6beds = $scope.beds[key].shift6;
						break;
				}
				// console.log($scope.beds[0]);
			});
		}
	});
patientFactory.getPatients(authorize.getCentre()).get({id:choosePatientFactory.getChosenPatient().id,fullDetails:true}).$promise.then(function(response){
	$scope.patient = response;
	$scope.ota.centreId=authorize.getCentre();
	$scope.ota.patientId=$scope.patient.id;
	$scope.ota.tmtMachine=$scope.patient.type;
});

////////function
$scope.make_ota=function(){
	$scope.ota.oneTimeAppointment=true;
	console.log("In make ota");
	//no of beds
	
	//dayOfTheWeek
	var d= new Date($scope.ota.date);
	var x = d.getDay();
	var day=null;
	if(x==0)
		day="Sunday";
	else if(x==1)
		day="Monday";
	else if(x==2)
		day="Tuesday";
	else if(x==3)
		day="Wednesday";
	else if(x==4)
		day="Thursday";
	else if(x==5)
		day="Friday";
	else if(x==6)
		day="Saturday";

	$scope.ota.dayOfTheWeek=day;
	
	//check if selected shift number has atleast one bed avalaible
	if($scope.ota.shiftNumber==1)
		if($scope.shift1beds>=1)
			$scope.correctshift=true;
	else if($scope.shiftNumber==2)
		if($scope.shift2beds>=1)
			$scope.correctshift=true;
	else if($scope.shiftNumber==3)
		if($scope.shift3beds>=1)
			$scope.correctshift=true;
	else if($scope.shiftNumber==4)
		if($scope.shift4beds>=1)
			$scope.correctshift=true;
	else if($scope.shiftNumber==5)
		if($scope.shift5beds>=1)
			$scope.correctshift=true;
	else if($scope.shiftNumber==6)
		if($scope.shift6beds>=1)
			$scope.correctshift=true;
	
	//set error if beds not avalaibl in selected shift
	if($scope.correctshift==false)
		$scope.message="Beds not Available in selected Shift";
	else if($scope.correctshift==true)
	{
			console.log("shifts are correct");

		$scope.message="";
		console.log($scope.ota);
		// save ota
		appointmentFactory.getAppointments(authorize.getCentre()).save($scope.ota).$promise.then(function(response){
			console.log("saving ota");
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
}]);
