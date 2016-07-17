'use strict';
angular.module('App')
.controller('AppointmentController',['$scope','patient','appointmentFactory','centreDetails',function($scope,patient,appointmentFactory,centreDetails){
	$scope.patient = patient;
	$scope.scheduled = false;
	if($scope.patient.shiftPatients.length != 0){
		$scope.patientScheduledMachine = $scope.patient.shiftPatients[0].tmtMachine;
		$scope.patientScheduledAppointmentType = $scope.shiftPatients[0].appointmentType;
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
	
	$scope.dataReceived = null;
	$scope.dataEntered = false;
	$scope.appointmentTypes = ['OPD','ICU/IPD'];
	$scope.$watch('appointmentType',function(newValue, oldValue){
		$scope.$watch('tmtOnMachine',function(newVal, oldVal){
			$scope.dataReceived = false;
			// $scope.dataEntered = true;
			if(newValue !== "" && newVal !== "" && newValue != null && newVal != null){
            	newVal = newVal.replace(/[+]/g, 'Positive');
            	newVal = newVal.replace(/[ ]/g,'')+'s';
            	newValue = newValue.replace(/[/]/g, '_');
            	// console.log(+"yo"+ newVal + " " + newValue);
            	$scope.string = newValue+'Available'+newVal;
				appointmentFactory.getSchedules(centreDetails.getCentreId()).query({appointmentType:newValue,tmtOnMachine:newVal}, function(results){
					$scope.daysData = results;
					$scope.dataReceived = true;
					// console.log("hey"+results);
				});
			}
		});
	});
	$scope.objs =[];
	$scope.$watch('freqPerWeek',function(newVal,oldVal){
		if($scope.objs.length <= newVal)	
			$scope.showAlert = false;
		if($scope.objs.length > newVal)
			$scope.showAlert = true;
	});
	$scope.book = function(id, shift, index, day){
		var obj={};
		obj.day = day;
		obj.shiftId = id;
		obj.appointmentType = $scope.appointmentType;
		obj.tmtMachine = $scope.tmtOnMachine;
		obj.patientId = $scope.patient.id;
		obj.shiftNumber = parseInt(shift.replace(/[^0-9]/g, ''),10);
		obj.shift= shift;
		obj.new = true;

		$scope.objs.push(obj);
		console.log(obj);
		console.log($scope.objs);
		$scope['saved_'+index] = true;
		console.log($scope.objs.length + " " + $scope.freqPerWeek);
		if($scope.objs.length > $scope.freqPerWeek)
			$scope.showAlert = true;

	};
	$scope.saved = function(id){
		return $scope['saved_' + id];
	};
	$scope.isEmpty = function(val){
		// console.log(val + typeof(val));
		return (Object.keys(val).length === 0);
	};
	$scope.unbook = function(day, index){
		for (var i = $scope.objs.length - 1; i >= 0; i--) {
			console.log($scope.objs[i].day + ' ' + day + " "+ $scope.objs[i].patientId+" "+ $scope.patient.id);
			if($scope.objs[i].day == day && $scope.objs[i].patientId == $scope.patient.id){
				if($scope.objs[i].new){
					$scope.objs.splice(i,1);
				}else{
					objs[i]['delete'] = true;
					$scope['saved_'+index] = false;
				}
			}
		}
		$scope['saved_'+index] = false;
		if($scope.objs.length <= $scope.freqPerWeek )
			$scope.showAlert = false;

	};

	///working on edit schedule
	$scope.editSchedule = function(){
		$scope.editSchedule == true;
		$scope.objs = [];
		var schedule = $scope.patient.shiftPatients;
		for(var i = 0 ;i < schedule.length;i++){
			// $scope.book(schedule[i].shiftId,)
		}
	};
	$scope.saveSchedule = function(){
		var update = [];
		var object = {};
		if($scope.editSchedule){

		}
		else{
			for (var i =0; i<$scope.objs.length;i++){
				//reduce available machines by 1
				object[$scope.objs[i].shiftId] = $scope.daysData[$scope.objs[i].day][$scope.objs[i].shift][$scope.string] -1;
			}
			var reqBody = {shiftPatients:$scope.objs,update:object, string:$scope.string};
			console.log("reqBody:");
			console.log(reqBody);
			appointmentFactory.getSchedules(centreDetails.getCentreId()).save(reqBody).$promise.then(function(results){

			});
		}

		$scope.editSchedule = false;

	};
	
	// $scope.options = ['Monday-Thursday','Monday-Wednesday','Tuesday-Friday'];
	$scope.weekDayComparator = function(v1, v2) {
	  // If we don't get strings, just compare by index
	  var weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
	  for(var i = 0; i < weekDays.length; i++){
	  	if(v1.value == weekDays[i]) return -1;
	  	if(v2.value == weekDays[i]) return 1;
	  }
	};
	
}])


;