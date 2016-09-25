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
		shiftNumber:0,
		appointmentType:null,
		tmtMachine:null,
		oneTimeAppointment:true,
		//faltu
	billingDone:false,
	monitoringDone:false,
	treatmentConsumptionAdded:false,
	processComplete:false,
	cancelled:false,
	allBillsCleared:false,
	billingRemarks:null
	present: false
	};

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
	$scope.ota.tmtMachine=$scope.patient.type+'Machine';
});

////////function
$scope.make_ota=function(){
	$scope.correctshift = false;
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
	console.log('shift selected = '+$scope.ota.shiftNumber)
	console.log('checking for free shifts now '+$scope.ota.shiftNumber+' '+$scope.shift2beds);
	//check if selected shift number has atleast one bed avalaible
	if($scope.ota.shiftNumber==1){
		console.log('shift 1 bed checking now');
		if($scope.shift1beds>=1){
			console.log('yeahhhhh');
			$scope.correctshift=true;
		}
	}
	else if($scope.ota.shiftNumber==2)
	{
		console.log('shift 2 bed checking now');
		if($scope.shift2beds>=1){
			console.log('yeahhhhh');
			$scope.correctshift=true;
		}
	}
	else if($scope.ota.shiftNumber==3)
		if($scope.shift3beds>=1)
			$scope.correctshift=true;
	else if($scope.ota.shiftNumber==4)
		if($scope.shift4beds>=1)
			$scope.correctshift=true;
	else if($scope.ota.shiftNumber==5)
		if($scope.shift5beds>=1)
			$scope.correctshift=true;
	else if($scope.ota.shiftNumber==6)
		if($scope.shift6beds>=1)
			$scope.correctshift=true;
	console.log('checked: '+$scope.correctshift);
	//set error if beds not avalaibl in selected shift
	if($scope.correctshift==false)
		$scope.message="Beds not available in selected Shift";
	else if($scope.correctshift==true)
	{
			console.log("shifts are correct");
			
		console.log(new Date());
        var newdate = new Date($scope.ota.date);
        newdate.setHours(23,59,59,999);
		$scope.ota.date=newdate;
		console.log($scope.ota.date);
		
		$scope.message="";
		console.log($scope.ota);
		// save ota
		$scope.ota.date = new Date($scope.ota.date);
		//$scope.ota.date = new Date("2016-09-04");
		appointmentFactory.getAppointments(authorize.getCentre()).save($scope.ota).$promise.then(function(response){
			console.log("saving ota");
			$scope.showalert_ota=true;
			$scope.message ="One Time Appointment Successful!";
			$scope.messageColor ='success';
		},function(response){
			console.log("save failed");
			$scope.showalert_ota=true;
			console.log(response);
			$scope.message ='Error: ' +response.status + " " + response.statusText+ "!";
			$scope.messageColor="danger";

		});
	}
}

$scope.ota={
		centreId:null,
		patientId:null,
		date:null,
		dayOfTheWeek:null,
		shiftNumber:0,
		appointmentType:null,
		tmtMachine:null,
		oneTimeAppointment:true,
		//faltu
	billingDone:false,
	monitoringDone:false,
	treatmentConsumptionAdded:false,
	processComplete:false,
	cancelled:false,
	allBillsCleared:false,
	billingRemarks:null
	present: false
	};



}]);
