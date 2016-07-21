'use strict';
angular.module('App')
.controller('ClinicalEventController',['$scope','patientFactory', 'authorize', function($scope,patientFactory,authorize){
		$scope.showalert_events=false;
		$scope.savedOnce = false;
		if(!$scope.view || ($scope.patient != null && (!$scope.events || $scope.events.length == 0)))
			$scope.events=[];
		$scope.event = {
			ID:null,
			date:'',
			details:"",
			comments:"",
			saved:false
		};
		$scope.addEvent = function(){
			$scope.showalert_events=false;
			if($scope.events.length)
				$scope.event.ID = $scope.events[$scope.events.length - 1].ID + 1;
			else $scope.event.ID = 0;
			if($scope.editClinical){
				$scope.event.patientId = $scope.patient.id;
			}
			else{
				$scope.event.patientId = $scope.newpatient_basic.id;
			}
			$scope.event.lastModifiedBy = authorize.getUsername();
			$scope.events.push($scope.event);
			console.log($scope.event);
			$scope.clinicalEventForm.$setPristine();
			$scope.event = {
				ID:null,
				date:'',
				details:"",
				comments:"",
				saved:false
	        };
		}
		$scope.removeEvent = function(id){
			$scope.showalert_events=false;
		    for (var i = $scope.events.length - 1; i >= 0; i--) {
                if($scope.events[i].ID == id){
                	if($scope.events[i].saved)
                		patientFactory.getPatientMajorClinicalEvents($scope.view?$scope.patient.id:$scope.newpatient_basic.id,authorize.getCentre()).delete({clinicalEventId:$scope.events[i].id});
                	// get all clinical events of a patient find matching event, get id and then delete or delete by event detail
                    $scope.events.splice(i,1);

                }
            }
		};
		$scope.updateClinical = function(){
			console.log('in Update Clinical function');
			if($scope.event.details !== '' || $scope.event.comments !== '' || $scope.event.date !== null){
				if($scope.events.length)
					$scope.event.ID = $scope.events[$scope.events.length - 1].ID + 1;
				else $scope.event.ID = 0;
				$scope.event.patientId = $scope.patient.id;
				$scope.event.lastModifiedBy = authorize.getUsername();
				console.log("why are you here");
				$scope.events.push($scope.event);
				console.log($scope.event);
			}
			var x = 0;
			for(var i = 0; i<$scope.events.length;i++){
				console.log(JSON.parse(JSON.stringify($scope.events[i])));
				if(!$scope.events[i].saved){
					$scope.events[i].saved = true;
					var id ;
					console.log("i" + i);
					console.log("x:outside " + x);
					patientFactory.getPatientMajorClinicalEvents($scope.patient.id,authorize.getCentre()).save($scope.events[i])
					.$promise.then(function(response){
						$scope.showalert_events=true;
						$scope.showAlertClinical = true;
						$scope.message = "Updated Clinical Events Successfully";			
						console.log($scope.events[x]);
						$scope.events[x].id = response.id;
						console.log("x:inside " + x);
						x++;
					},function(response){
						$scope.showAlertClinical = true;
						$scope.message = "Error: " + response.status + " " + response.statusText; 
					});	
				}
				else {
					$scope.events[i].lastModifiedBy = authorize.getUsername();
					patientFactory.getPatientMajorClinicalEvents($scope.patient.id,authorize.getCentre()).update({
						clinicalEventId:$scope.events[i].id
					},$scope.events[i]).$promise.then(function(response){
						$scope.showAlertClinical = true;
						$scope.message = "Updated Clinical Events Successfully";			
					},function(response){
						$scope.showAlertClinical = true;
						$scope.message = "Error: " + response.status + " " + response.statusText; 
					});
					x++;
				}
			}
			$scope.updateMyValuesFromClinical(false,$scope.showAlertClinical, $scope.message);
			$scope.clinicalEventForm.$setPristine();
			$scope.event = {
				ID:null,
				date:'',
				details:"",
				comments:"",
				saved:false
	        };	
		};

		$scope.saveEvents = function(){
			if($scope.event.date !== '' || $scope.event.details !== '' || $scope.event.comments !== ''){
				if($scope.events.length)
					$scope.event.ID = $scope.events[$scope.events.length - 1].ID + 1;
				else $scope.event.ID = 0;
				$scope.event.patientId = $scope.newpatient_basic.id;
				$scope.event.lastModifiedBy = $scope.newpatient_basic.lastModifiedBy;
				$scope.events.push($scope.event);
				console.log($scope.event);
			}
			var x = 0;
			for(var i = 0; i<$scope.events.length;i++){
				if(!$scope.events[i].saved){
					$scope.events[i].saved = true;
					var id ;
					console.log("i" + i);
					console.log("x:outside " + x);
					patientFactory.getPatientMajorClinicalEvents($scope.newpatient_basic.id,authorize.getCentre()).save($scope.events[i]).$promise.then(function(response){
						$scope.showalert_events=true;
						console.log($scope.events[x]);
						$scope.events[x].id = response.id;
						console.log("x:inside " + x);
						x++;
					},function(response){
						$scope.showalert_events=false;
						console.log(response);
					});	
				}
				else x++;
			}
			for(var i = 0; i<$scope.events.length;i++){
				console.log($scope.events[i].id + " " + $scope.events[i].saved);
			}
			$scope.clinicalEventForm.$setPristine();
			$scope.savedOnce = true;
			$scope.event = {
				ID:null,
				date:'',
				details:"",
				comments:"",
				saved:false
	        };	
		};
		
		

}])
;