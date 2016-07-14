'use strict';
angular.module('App')
.controller('ViewAppointmentsController',['$scope','appointmentFactory','authorize',function($scope, appointmentFactory, authorize){
    
    $scope.futureAppointments = function(){
        appointmentFactory.getFutureAppointments(authorize.getCentre()).query(function(response){
            $scope.past = false;    
            $scope.all = true;
            $scope.today = false;
            $scope.appointments = response;
            if(response.$status == 206){
                console.log("set marked");
                $scope.showAlertMarkOlderAppointments = true;
            }
        },function(response){
            $scope.alert = true;
            $scope.message = "Error:"+response.status+" "+ response.statusText;
        });

    };
    $scope.futureAppointments();

    // console.log($scope.appointments[0]);
    $scope.todaysAppointments =function(){
        console.log(new Date());
        var toDate = new Date();
        toDate.setHours(23,59,59,999);
        appointmentFactory.getFutureAppointments(authorize.getCentre()).query({date:toDate},function(results){
            $scope.appointments  = results;  
            $scope.today = true; 
            $scope.all = false; 
       }); 
    };
    $scope.myDate = new Date();

    $scope.captureAppointment = function(appointment){
        $scope.appointment = appointment;
    };
    $scope.cancelAppointment = function(id){
        if(id == $scope.appointment.appointmentId){
            for(var i = 0; i< $scope.appointments.length;i++)
                if($scope.appointments[i].appointmentId == id) $scope.appointments[i].cancelled = true;
            appointmentFactory.getFutureAppointments(authorize.getCentre()).update({appointmentId:id},{cancelled:true}).$promise.then(function(resp){
                $scope.showAlertCancelled = true;
            });
        }
    };
    $scope.pastAppointments = function(){
        appointmentFactory.getPastAppointments(authorize.getCentre()).query(function(results){
            $scope.appointments  = results;    
            $scope.past = true;
       });   

    };
    $scope.markAttended = function(id, value){
        for(var i = 0; i< $scope.appointments.length;i++)
                if($scope.appointments[i].appointmentId == id) $scope.appointments[i].attended = value;
        appointmentFactory.getFutureAppointments(authorize.getCentre()).update({appointmentId:id},{attended:value}).$promise.then(function(resp){
            $scope.showAlertMarkedAttended = true;
            $scope.showAlertCancelled = false;
            $scope.showAlertMarkOlderAppointments = false;
        })
    }

}])
.filter("dateFilter", function() {
  return function(items, from, to) {
        // console.log("Date From and to UnParsed: " +from + ' ' + to);
        from = new Date(from);
        from.setHours(0,0,0,0,0);
        to = new Date(to);
        to.setHours(0,0,0,0,0);
        var df = Date.parse(from);
        var dt = Date.parse(to);
        var result = [];
        // console.log("DateFrom and to parsed:outside loop:" + df + '' + dt);  
        if(!items || !df || !dt) return items; 
        for (var i=0; i<items.length; i++){
            var d = new Date(items[i].date);
            d.setHours(0,0,0,0,0);
            console.log(d +" "+ from + " " +to);
            var date = Date.parse(d);
            // console.log(d + "<-newDate: instance[i].date newDate parsed->"  + date );
            console.log(df + " " +date + ' ' + dt);
            if (date >= df && date <= dt)  {
                result.push(items[i]);
            }
        }            
        return result;
  };
});

;