'use strict';
angular.module('App')
.controller('MonitoringController',['$scope','patientFactory','choosePatientFactory','authorize','monitoringChartFactory', function($scope, patientFactory, choosePatientFactory, authorize,monitoringChartFactory){
       $scope.showalert_predialysis_basic=false;
        patientFactory.getPatients(authorize.getCentre()).get({id:choosePatientFactory.getChosenPatient().id}).$promise.then(function(response){
        	$scope.patient =response;
        });
		$scope.showDateAlert= false;
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
        $scope.setPreHDWeight  = function (val) {
            $scope.preHDWeight = val;
        };
        $scope.savedOnce=false;
        $scope.savePreBasic = function(){
            if(angular.isDate($scope.basic.monitoringDate)==false || $scope.basic.monitoringDate==null || $scope.basic.monitoringDate.length==0){
                $scope.showDateAlert=true;
                console.log('Wrong Date');
                return;
            }
            $scope.showDateAlert= false;
        	$scope.basic.patientId = $scope.patient.id;
    		$scope.basic.lastModifiedBy = authorize.getUsername();
    		console.log($scope.basic);
    		console.log($scope.patient.id);
    		monitoringChartFactory.getPreBasic($scope.patient.id).save($scope.basic).$promise.then(
                function(response){
    				$scope.basic.preBasicId=response.preBasicId;
    				$scope.showalert_predialysis_basic=true;
                    $scope.savedOnce=true;
    			},function(response){
    				$scope.showalert_predialysis_basic=false;
    				console.log(response);
    			});
			
        };

    }])
;