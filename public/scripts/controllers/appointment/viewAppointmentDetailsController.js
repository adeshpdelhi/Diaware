'use strict';
angular.module('App')
.controller('ViewAppointmentDetailsController',['$scope','appointmentFactory','authorize','appointment', '$state', function($scope, appointmentFactory, authorize,appointment,$state){
    $scope.appointment =  appointment;
    console.log(appointment);
    $scope.attendance = false;


    $scope.isClinical = function(){
        var user = authorize.getActiveUser();
        return user.clinical || user.admin || user.incharge;
    };
    $scope.changeAttendance = function(val){
        console.log("val:" + val);
        $scope.attendance = val;
    };
    $scope.markAttendance = function(){
            $scope.appointment.attended = $scope.attendance;
            console.log($scope.appointment.attended);
            appointmentFactory.getFutureAppointments(authorize.getCentre()).update({appointmentId:appointment.appointmentId},{attended:$scope.attendance})
            .$promise.then(function(resp){
                $scope.showAlert = true;
                $scope.message = "Marked Attendance as " + ($scope.attendance?'attended':'not attended') + ' Successfully!';
                $scope.messageColor = "success"; 
            },function(response){
                $scope.showAlert = true;
                $scope.message = "Failes to mark Attendance!";
                $scope.messageColor = "danger"; 
            });
    };
    $scope.cancelAppointment = function(){
        $scope.appointment.cancelled = true;
        appointmentFactory.getFutureAppointments(authorize.getCentre()).update({appointmentId:appointment.appointmentId},{cancelled:true})
        .$promise.then(function(resp){
            $scope.showAlert = true;
            $scope.message = "Cancelled  Apointment Successfully!";
            $scope.messageColor = "success"; 
        },function(response){
            $scope.showAlert = true;
            $scope.message = "Failes to cancel Apointment!";
            $scope.messageColor = "danger"; 
        });
    };
    $scope.redirectToMonitoringChart = function(){
        console.log("app.monitoring.view" + $scope.appointment.patientId + " "+ $scope.appointment.date);
        $state.go('app.monitoring.view', {patientId:$scope.appointment.patientId, date:$scope.appointment.date});
    };

}]);
