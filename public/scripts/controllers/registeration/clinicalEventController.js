'use strict';
angular.module('App')
.controller('ClinicalEventController',['$scope','patientFactory', 'authorize', function($scope,patientFactory,authorize){
		$scope.showalert_events=false;
		$scope.events=[];
		$scope.event = {
			ID:null,
			date:'',
			details:"",
			comments:"",
			saved:false
		};
		var cnt = 0;
		$scope.addEvent = function(){
			$scope.showalert_events=false;
			$scope.event.ID = cnt++;
			$scope.event.patientId = $scope.newpatient_basic.id;
			$scope.event.lastModifiedBy = $scope.newpatient_basic.lastModifiedBy;
			$scope.events.push($scope.event);
			console.log($scope.event);
			$scope.clinicaleventForm.$setPristine();
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
                		patientFactory.getPatientMajorClinicalEvents($scope.newpatient_basic.id,authorize.getCentre()).delete({clinicalEventId:$scope.events[i].id});
                	// get all clinical events of a patient find matching event, get id and then delete or delete by event detail
                    $scope.events.splice(i,1);

                }
            }
		}
		$scope.saveEvents = function(){
			if($scope.event.date !== '' || $scope.event.details !== '' || $scope.event.comments !== ''){
				$scope.event.ID = cnt++;
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
						console.log($scope.events[x]);
						$scope.events[x].id = response.id;
						console.log("x:inside " + x);
						x++;
					});	
				}
				else x++;
			}
			for(var i = 0; i<$scope.events.length;i++){
				console.log($scope.events[i].id + " " + $scope.events[i].saved);
			}
			$scope.clinicaleventForm.$setPristine();
			$scope.event = {
				ID:null,
				date:'',
				details:"",
				comments:"",
				saved:false
	        };
			$scope.showalert_events=true;
		};
		
		

}])
;