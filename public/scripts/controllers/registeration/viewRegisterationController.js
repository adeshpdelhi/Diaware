'use strict';
angular.module('App')
.controller('ViewRegistrationController',['$scope','patientFactory','choosePatientFactory','authorize', function($scope, patientFactory, choosePatientFactory,authorize){
		$scope.isEditable=false;
        patientFactory.getPatients(authorize.getCentre()).get({id:choosePatientFactory.getChosenPatient().id}).$promise.then(function(response){
        	$scope.patient = response;
        });
		
		$scope.edit_basic_details = function(){
			$scope.isEditable=true;
		};
		$scope.update_basic_details = function(){
			$scope.isEditable=false;
			patientFactory.getPatients(authorize.getCentre()).update({id:choosePatientFactory.getChosenPatient().id},$scope.patient);
			console.log($scope.patient);
		};
    }])
;