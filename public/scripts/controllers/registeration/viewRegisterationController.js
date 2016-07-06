'use strict';
angular.module('App')
.controller('ViewRegistrationController',['$scope','patientFactory','choosePatientFactory', function($scope, patientFactory, choosePatientFactory){
        $scope.patient = patientFactory.getPatients().get({id:choosePatientFactory.getChosenPatient().id});
    }])
;