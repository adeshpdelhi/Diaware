'use strict';
angular.module('App')
	.controller('DialysisCarePlanController',['$scope','patientFactory','choosePatientFactory', function($scope, patientFactory, choosePatientFactory){
       
        $scope.patient = patientFactory.getPatients().get({id:choosePatientFactory.getChosenPatient().id});
    }])
    ;