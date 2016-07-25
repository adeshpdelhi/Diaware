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
			if($scope.patient.shiftPatients.length !== 0){
				$scope.patientSchedule = $scope.patient.shiftPatients;
				$scope.appointmentType = $scope.patient.shiftPatients[0].appointmentType;
				$scope.tmtOnMachine = $scope.patient.shiftPatients[0].tmtMachine;
				$scope.scheduled = true;
			}
			$scope.machineTypes = [];
			if($scope.patient.medicalHistories.length != 0){
				var medHist = $scope.patient.medicalHistories;
				for(var i = 0; i < medHist.length; i++){
					if(medHist[i].diseaseName == 'hepatitisB' && medHist[i].diseasePresent == 'Yes')
						$scope.machineTypes.push('B+ Machine');
					if(medHist[i].diseaseName == 'hepatitisC' && medHist[i].diseasePresent == 'Yes')
						$scope.machineTypes.push('C+ Machine');
					if(medHist[i].diseaseName == 'HIV' && medHist[i].diseasePresent =='Yes')
						$scope.machineTypes.push('HIV Machine');
				}
				if($scope.machineTypes.length == 0) $scope.machineTypes.push("Negative Machine");
			}
			else 
				$scope.machineTypes = ['Negative Machine','B+ Machine', 'C+ Machine','HIV Machine'] ;// fetch from db - store in db
		}
	});

	$scope.reloadDaysData = function(newVal, newVal1){
    	newVal1 = newVal1.replace(/[+]/g, 'Positive');
    	newVal1 = newVal1.replace(/[ ]/g,'')+'s';
    	newVal = newVal.replace(/[/]/g, '_');
    	$scope.string = newVal+'Available'+newVal1;
    	// console.log("string: " + $scope.string);
    	$scope.daysData = {};
    	console.log("loading fresh daysData");
    	var centre = (authorize.getCentre() == 'all')?$scope.patient.centreId:authorize.getCentre();
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
	$scope.book = function(id, shift, index, day){
		var obj = {};
		
		obj.day = day;
		obj.shiftId = id;
		obj.appointmentType = $scope.appointmentType;
		obj.tmtMachine = $scope.tmtOnMachine;
		obj.patientId = $scope.patient.id;
		obj.shiftNumber = parseInt(shift.replace(/[^0-9]/g, ''),10);
		obj.shift= shift;
		obj.new = true;

		console.log("index : "+ index);
		$scope['saved_'+index] =true;
		console.log('OBJECT BOOKED');
		console.log(obj);
		for(var i = 0; i < $scope.objs.length; i++){
			if($scope.objs[i].shiftId == id && $scope.objs[i].delete){
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
		var object = {};
		for (var i =0; i<$scope.objs.length;i++){
			if($scope.objs[i].delete){
				console.log("after deleting, no of bed Available: " + ($scope.daysData[$scope.objs[i].day][$scope.objs[i].shift][$scope.string] +1));
				object[$scope.objs[i].shiftId] = $scope.daysData[$scope.objs[i].day][$scope.objs[i].shift][$scope.string] +1;
			}
			if($scope.objs[i].new)
				object[$scope.objs[i].shiftId] = $scope.daysData[$scope.objs[i].day][$scope.objs[i].shift][$scope.string] -1;
		}
		var reqBody = {
			shiftPatients : $scope.objs,
			update : object, 
			string : $scope.string
		};
		console.log("reqBody:");
		console.log(reqBody);
		appointmentFactory.getSchedules(centreDetails.getCentreId()).save(reqBody).$promise.then(function(results){
			$scope.patientSchedule = results.shiftPatients;
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
		var object = {};
		for (var i =0; i<$scope.objs.length;i++){
			if($scope.objs[i].delete){
				console.log("after deleting, no of bed Available: " + ($scope.daysData[$scope.objs[i].day][$scope.objs[i].shift][$scope.string] +1));
				object[$scope.objs[i].shiftId] = $scope.daysData[$scope.objs[i].day][$scope.objs[i].shift][$scope.string] +1;
			}
			if($scope.objs[i].new)
				object[$scope.objs[i].shiftId] = $scope.daysData[$scope.objs[i].day][$scope.objs[i].shift][$scope.string] -1;
		}
		var reqBody = {
			shiftPatients : $scope.objs,
			update : object, 
			string : $scope.string
		};
		console.log("reqBody:");
		console.log(reqBody);
		appointmentFactory.getSchedules(centreDetails.getCentreId()).update({
			patientId:$scope.patient.id
		},reqBody).$promise.then(function(results){
			$scope.patientSchedule = results.shiftPatients;
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