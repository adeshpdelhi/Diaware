'use strict';
angular.module('App')
.controller('MonitoringController',['$scope','patientFactory','choosePatientFactory','authorize','monitoringChartFactory','$stateParams', function($scope, patientFactory, choosePatientFactory, authorize,monitoringChartFactory,$stateParams){
        $scope.showalert_predialysis_basic=false;
        var appointment = choosePatientFactory.getAppointment();
        $scope.showChart = true;
        if(appointment.monitoringDone || appointment.processComplete){
            $scope.showChart = false;
            $scope.messageChart = "Monitoring Chart for this appointment has already been filled! You may edit it by going to edit Monitoring Chart";
            $scope.messageChartColor = 'success';
        }
        if(!appointment.present){
            $scope.showChart = false;
            $scope.messageChart = "Patient hasn't attended this appointment yet! Can't fill their monitoring Chart!";   
            $scope.messageChartColor = 'danger';

        }
        if(!appointment.billingDone && appointment.present){
            $scope.showChart = false;
            $scope.messageChart = "Patient hasn't payed the bills yet! Can't fill their monitoring Chart!";      
            $scope.messageChartColor = 'warning';
        }
        var chosenPatientId = $stateParams.patientId?($stateParams.patientId):(choosePatientFactory.getChosenPatient().id);
        patientFactory.getPatients(authorize.getCentre()).get({id:chosenPatientId}).$promise.then(function(response){
        	$scope.patient =response;
            $scope.basic.patientId = $scope.patient.id;
        });
		$scope.showDateAlert= false;
        $scope.basic = {
        	patientId:$stateParams.patientId?$stateParams.patientId:null,
        	monitoringDate:new Date(appointment.date),
        	preBasicId:null,
        	machineNumber:null,
        	bedNumber:null,
        	leadTechnicianName:null,
        	prescribedDuration:null,
        	startTime:null,
        	endTime:null,
        	lastModifiedBy:null
        };
        
        $scope.$watch('basic.patientId',function(newVal,oldVal){
            if(newVal){
                patientFactory.getPatientCarePlans(newVal,authorize.getCentre()).get({latestPlan:true})
                .$promise.then(function(response){
                    console.log("response:hhhhhhhhhho: " + response);
                    console.log(response);
                    if(!response.dialysisDurationRegular) $scope.basic.prescribedDuration = 0;
                    else $scope.basic.prescribedDuration = response.dialysisDurationRegular;
                    console.log("dryWeight: "+$scope.basic.prescribedDuration);

                },function(response){
                    $scope.showalert_predialysis_basic=true;

                    // $scope.showalert_predialysis_assessment = true;
                    $scope.message = " Error: " + response.status  + " " + response.statusText + "!";
                    $scope.messageColor='danger';
                });
            }
        });
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
                    $scope.message = "Details Saved Successfully!";
                    $scope.messageColor = "success";
    				$scope.showalert_predialysis_basic=true;
                    $scope.savedOnce=true;
    			},function(response){
                    $scope.messageColor="danger";
                    $scope.message ="Error: "+ response.status+ " "+ response.data+"!";
    				$scope.showalert_predialysis_basic=true;
    				console.log(response);
    			});
			
        };

    }])
;
/*
$scope.validateEndTime = function(startTime,endTime){
    if(angular.isUndefined(endTime)|| angular.isUndefined(startTime)) 
        return false;
    console.log(endTime);
    console.log(startTime);

    var end = endTime.split(':');
    var start = startTime.split(':')
    if(angular.isUndefined(end[1]) || angular.isUndefined(start[1])){
        return false;
    }
    var endHrs = parseInt(end[0]), endMin = parseInt(end[1]);
    var startHrs = parseInt(start[0]), startMin = parseInt(start[1]);
    if( endHrs > 23 || endMin > 59 || startHrs > 23 || startMin > 59 ) 
        return false;
    if(endHrs < startHrs) return false;
    else if( endHrs > startHrs) return true;
    else if(endMin > startMin) return true;
    else return false;
};
*/