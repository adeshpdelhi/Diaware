'use strict';
angular.module('App')
.controller('ClinicalEventController',['$scope','patientFactory','ClinicalEventsFactory', '$stateParams','choosePatientFactory', function($scope,patientFactory,ClinicalEventsFactory, $stateParams,choosePatientFactory){
		$scope.events=[];
		$scope.event = {
			date:'',
			clinicaldetails:"",
			comments:""
		};
		
		$scope.saveEvent=function(){
			$scope.events.push($scope.event);
			console.log($scope.event);
			ClinicalEventsFactory.updateEvents($scope.events);
			$scope.clinicaleventForm.$setPristine();
			$scope.event = {
				date:'',
				clinicaldetails:"",
				comments:""
	        };
		};
		

}])
;