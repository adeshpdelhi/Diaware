'use strict';
angular.module('App')
.controller('MonitoringController',['$scope','patientFactory','choosePatientFactory', function($scope, patientFactory, choosePatientFactory){
       
        $scope.patient = patientFactory.getPatients().get({id:choosePatientFactory.getChosenPatient().id});
    }])
;