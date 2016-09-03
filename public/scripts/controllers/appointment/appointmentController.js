'use strict';
angular.module('App')
.controller('AppointmentController',['$scope','patient','appointmentFactory','centreDetails','authorize',function($scope,patient,appointmentFactory,centreDetails,authorize){
	$scope.patient = patient;
	$scope.scheduled = false;
	$scope.dataEntered = false;
	$scope.dataReceived = false;
	$scope.scheduleSaved = false;
	$scope.editSchedules = false;
	$scope.appointmentTypes = ['OPD','IPD/ICU'];

	// $scope.invalidCentre = false;
	// if(authorize.getCentre() == 'all') {
	// 	$scope.invalidCentre = true;
	// }
	$scope.$watch('patient.id', function(newVal,oldVal){
		if(newVal){
			console.log(patient);
			if($scope.patient.schedulePatients.length !== 0){
				$scope.patientSchedule = $scope.patient.schedulePatients;
				$scope.appointmentType = $scope.patient.schedulePatients[0].appointmentType;
				$scope.tmtOnMachine = $scope.patient.schedulePatients[0].tmtMachine;
				$scope.scheduled = true;
			}
			$scope.machineTypes = [];
			$scope.machineTypes.push($scope.patient.type+"Machine");
		}
	});

	$scope.reloadDaysData = function(newVal, newVal1){
    	newVal1 = newVal1.replace(/[+]/g, 'Positive');
    	newVal1 = newVal1.replace(/[ ]/g,'');
    	newVal = newVal.replace(/[/]/g, '_');
    	$scope.string = newVal+'Available'+newVal1;
    	// console.log("string: " + $scope.string);
    	$scope.daysData = {};
    	console.log("loading fresh daysData");
    	var centre = (authorize.getCentre() == 'all')?$scope.patient.centreId:authorize.getCentre();
    	console.log("appointmentType: "+ newVal+", tmtMachine: "+newVal1);
		appointmentFactory.getSchedules(centre).query({appointmentType:newVal,tmtOnMachine:newVal1}, function(results){
			$scope.daysData = results;
			$scope.dataReceived = true;
		});		
	};
	$scope.$watch('appointmentType', function(newVal, oldVal){
		console.log("changed appointmentType to value " + newVal);
		$scope.$watch('tmtOnMachine', function(newVal1, oldVal1){
			console.log("inside watch to load daysData");
			if(newVal1 !== "" && newVal !== "" && newVal1 != null && newVal != null){
      			$scope.reloadDaysData(newVal,newVal1);
			}
		},true);
	},true);

	$scope.objs = [];
	$scope.$watch('scheduled',function(newVal,oldVal){
		if($scope.scheduled){
			for(var i = 0 ; i < $scope.patientSchedule.length; i++)
			{
				$scope.patientSchedule[i].new = false;
			}
			$scope.objs = $scope.patientSchedule;
		}
	});
	$scope.isBooked = function(id){
		// console.log("is bOOked: id: "+id);
		return $scope['saved_'+id];
	};
	$scope.book = function(shift, index, day){
		var obj = {};
		
		obj.centreId = $scope.patient.centreId;
		obj.patientId = $scope.patient.id;
		obj.day = day;
		shift = parseInt(shift.replace(/[^0-9]/g, ''),10);
		obj.shiftNumber = shift;
		obj.appointmentType = $scope.appointmentType;
		obj.tmtMachine = $scope.tmtOnMachine;
		// obj.shift= shift;
		obj.new = true;

		console.log("index : "+ index);
		$scope['saved_'+index] =true;
		console.log('OBJECT BOOKED');
		console.log(obj);
		for(var i = 0; i < $scope.objs.length; i++){
			if(!$scope.newSchedule && ($scope.objs[i].day == day) && ($scope.objs[i].shiftNumber == shift) && $scope.objs[i].delete){
				$scope.objs[i].delete = false;
				return;
			}
		}
		$scope.objs.push(obj);
	};
	$scope.unbook = function(day, index){
		for (var i = $scope.objs.length - 1; i >= 0; i--) {
			if($scope.objs[i].day == day  && $scope.objs[i].patientId == $scope.patient.id){
				if($scope.objs[i].new){
					$scope.objs.splice(i,1);
				}else{
					$scope.objs[i]['delete'] = true;
				}
			}
		}
		console.log("OBJECT UNBOOKED");
		$scope['saved_' + index] = false;
	};
	
	$scope.editSchedule = function(){
		$scope.editSchedules = true;
		$scope.dataReceived = false;
		$scope.scheduleSaved = false;
		$scope.scheduled = false; // might create a problem while doing back
		$scope.objs = [];
		console.log("inside editSchedule");
		for(var i = 0; i < $scope.patientSchedule.length; i++){
			var j = 0;
			// console.log('i: ' + i);
			for(key in $scope.daysData){
				if($scope.patientSchedule[i].day == key && !$scope.patientSchedule[i].delete){
					// console.log("day:" + key);
					$scope.patientSchedule[i]['new'] = false;
					$scope.patientSchedule[i]['shift'] = 'shift'+$scope.patientSchedule[i].shiftNumber;
					$scope.objs.push($scope.patientSchedule[i]);
					$scope['saved_'+ j] = true;
				}
				j++;

			}
		}
		$scope.reloadDaysData($scope.appointmentType,$scope.tmtOnMachine);

	};
	$scope.planNewSchedule = function(){
		$scope.scheduled = false; // might create a problem while doing back
		$scope.newSchedule = true;
		$scope.dataReceived = false;
		$scope.scheduleSaved = false;
		// $scope.appointmentType = "";
		// $scope.tmtOnMachine = "";
		var j = 0;
		
		for(key in $scope.daysData){
			console.log("j: "+ j );
			$scope['saved_'+ j++] = false;			
		}
		$scope.reloadDaysData($scope.appointmentType,$scope.tmtOnMachine);
		for(var i = 0; i < $scope.objs.length;i++){
			$scope.objs[i]['delete'] = true;
			$scope.objs[i]['new'] = false;
			$scope.objs[i]['shift'] = 'shift'+$scope.objs[i].shiftNumber;
			// $scope['saved_'+ j] = false;			
		}
		// $scope.objs = [];
		console.log("inside planNewSchedule");
	};

	$scope.saveSchedule = function () {
		console.log("inside saveSchedule");
		if($scope.newSchedule){
			console.log("deleting previous schedule")
    		var centre = (authorize.getCentre() == 'all')?$scope.patient.centreId:authorize.getCentre();
			appointmentFactory.getSchedules(centre).delete({
				patientId:$scope.patient.id,
				deleteAll:true
			}).$promise.then(function(results){
				console.log("results deleted:");
				console.log( results);
			},function(response){
				$scope.message = "Error: "+response.status+" " + response.statusCode + "!";
				$scope.messageColor ='danger';			
				$scope.scheduleSaved = true;
				return;
			});
		}
		var reqBody = {
			schedulePatients : $scope.objs
		};
		console.log("reqBody:");
		console.log(reqBody);
		appointmentFactory.getSchedules(centreDetails.getCentreId()).save(reqBody).$promise.then(function(results){
			$scope.patientSchedule = results.schedulePatients;
			console.log("results saved: ");
			console.log( $scope.patientSchedule);
			$scope.message = "saved Successfully!";
			$scope.messageColor ='success';

			$scope.scheduled = true;
			$scope.newSchedule = false;
			$scope.editSchedules = false;

			$scope.scheduleSaved = true;
		},function(response){
			$scope.message = "Error: "+response.status+" " + response.statusCode + "!";
			$scope.messageColor ='danger';			
		});
	};	

	$scope.saveEditedSchedule = function(){
		var reqBody = {
			schedulePatients : $scope.objs
		};
		console.log("reqBody:");
		console.log(reqBody);
		appointmentFactory.getSchedules(centreDetails.getCentreId()).update({
			patientId:$scope.patient.id
		},reqBody).$promise.then(function(results){
			$scope.patientSchedule = results.schedulePatients;
			console.log("results update:" );
			console.log($scope.patientSchedule);
			$scope.message = "saved Successfully!";
			$scope.messageColor ='success';

			$scope.scheduled = true;
			$scope.newSchedule = false;
			$scope.editSchedules = false;

			$scope.scheduleSaved = true;
		},function(response){
			$scope.message = "Error: "+response.status+" " + response.statusCode + "!";
			$scope.messageColor ='danger';			
		});


		$scope.scheduled = true;
		$scope.newSchedule = false;
		$scope.editSchedules = false;

		$scope.scheduleSaved = true;

	};

}])


;