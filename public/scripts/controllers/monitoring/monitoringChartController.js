'use strict';
angular.module('App')
.controller('MonitoringController',['$scope','patientFactory','choosePatientFactory','authorize','monitoringChartFactory', function($scope, patientFactory, choosePatientFactory, authorize,monitoringChartFactory){
       
        patientFactory.getPatients(authorize.getCentre()).get({id:choosePatientFactory.getChosenPatient().id}).$promise.then(function(response){
        	$scope.patient =response;
        });
        $scope.basic = {
        	patientId:null,
        	monitoringDate:null,
        	preBasicId:null,
        	machineNumber:null,
        	bedNumber:null,
        	leadTechnicianName:null,
        	prescribedDuration:null,
        	startTime:null,
        	endTime:null,
        	lastModifiedBy:null
        };
        $scope.preHDWeight=0;
        $scope.savePreBasic = function(){
        	$scope.basic.patientId = $scope.patient.id;
    		$scope.basic.lastModifiedBy = authorize.getUsername();
    		console.log($scope.basic);
    		console.log($scope.patient.id);
    		monitoringChartFactory.getPreBasic($scope.patient.id).save($scope.basic).$promise.then(function(response){
    			$scope.basic.preBasicId = response.preBasicId;
    		});
        };

    }])
;