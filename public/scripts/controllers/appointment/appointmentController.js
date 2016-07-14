'use strict';
angular.module('App')
.controller('AppointmentController',['$scope','patient','appointmentFactory','centreDetails',function($scope,patient,appointmentFactory,centreDetails){
	$scope.patient = patient;
	$scope.dataReceived = null;
	$scope.dataEntered = false;
	$scope.appointmentTypes = ['OPD','ICU/IPD'];
	$scope.machineTypes = ['Negative Machine','B+ Machine', 'C+ Machine','HIV Machine'] ;// fetch from db - store in db
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
			if($scope.objs[i].day == day && $scope.objs[i].patientId == $scope.patient.id)
				$scope.objs.splice(i,1);
		}
		$scope['saved_'+index] = false;
		if($scope.objs.length <= $scope.freqPerWeek )
			$scope.showAlert = false;

	};
	$scope.save = function(){
		var update = [];
		var object = {};		
		for (var i =0; i<$scope.objs.length;i++){
			object[$scope.objs[i].shiftId] = $scope.daysData[$scope.objs[i].day][$scope.objs[i].shift][$scope.string] -1;
		}
		var reqBody = {shiftPatients:$scope.objs,update:object, string:$scope.string};
		console.log("reqBody:");
		console.log(reqBody);
		appointmentFactory.getSchedules(centreDetails.getCentreId()).save(reqBody).$promise.then(function(results){

		});

	};
	// $scope.options = ['Monday-Thursday','Monday-Wednesday','Tuesday-Friday'];
	
}])

;