'use strict';
angular.module('App')
.controller('ViewAppointmentsController',['$scope','appointmentFactory','authorize','$state',function($scope, appointmentFactory, authorize,$state){
    $scope.toggle = false;
    $scope.dataReceived = false;
    $scope.prevSetFilter ='pastAppointments';
    // $scope.allAppointments = function(){
    //     $scope.dataReceived = false;
    //     appointmentFactory.getAppointments(authorize.getCentre()).query(function(response){
    //         $scope.past = false;    
    //         $scope.all = true;
    //         $scope.today = false;
    //         $scope.future = false;
    //         $scope.appointments = response;
    //         $scope.filter = 'appointments';
    //         if(response.$status == 206){
    //             $scope.showAlertMarkOlderAppointments = true;
    //         }
    //         $scope.dataReceived = true ;
    //         $scope.initCardContent();
    //         $scope.filterVal = "Future";
    //     },function(response){
    //         $scope.alert = true;
    //         $scope.message = "Error:"+response.status+" "+ response.statusText;
    //     });
    // }
    $scope.futureAppointments = function(){
        $scope.dataReceived = false;
        appointmentFactory.getFutureAppointments(authorize.getCentre()).query(function(response){
            $scope.past = false;    
            $scope.today = false;
            $scope.future = true;
            $scope.appointments = response;
            $scope.filter = 'futureAppointments';
            if(response.$status == 206){
                console.log("set marked");
                $scope.showAlertMarkOlderAppointments = true;
            }
            $scope.dataReceived = true ;
            $scope.initCardContent();
            $scope.filterVal = "Future";
        },function(response){
            $scope.alert = true;
            $scope.message = "Error:"+response.status+" "+ response.statusText;
        });

    };
    $scope.futureAppointments();

    // console.log($scope.appointments[0]);
    $scope.todaysAppointments =function(){
        $scope.dataReceived = false;
        // $scope.prevSetFilter = 'appointments';
        $scope.filter = 'appointments';
        console.log(new Date());
        var toDate = new Date();
        toDate.setHours(23,59,59,999);
        appointmentFactory.getFutureAppointments(authorize.getCentre()).query({date:toDate},function(results){
            $scope.appointments  = results;  
            $scope.today = true; 
            $scope.all = false; 
            $scope.future = false;
            $scope.dataReceived = true ;
            $scope.initCardContent();
            $scope.filterVal = "Todays";

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
    // $scope.pastAppointments = function(){
    //     $scope.dataReceived = false;

    //     appointmentFactory.getPastAppointments(authorize.getCentre()).query(function(results){
    //         $scope.appointments  = results;    
    //         $scope.past = true;
    //         $scope.dataReceived = true ;
    //         $scope.today = false;
    //         $scope.all = false;
    //         $scope.future = false;
    //         $scope.initCardContent();


    //    });   

    // };
    $scope.markPresence = function(id, value){
        // if(value == false){
            for(var i = 0; i< $scope.appointments.length;i++)
                if($scope.appointments[i].appointmentId == id) $scope.appointments[i].attended = value;
            appointmentFactory.getFutureAppointments(authorize.getCentre()).update({appointmentId:id},{present:value}).$promise.then(function(resp){
                $scope.showAlertMarkedAttended = true;
                $scope.showAlertCancelled = false;
                $scope.showAlertMarkOlderAppointments = false;
            });
        // }
        // else{
        //     for(var i = 0 ; i < $scope.appointments.length;i++){
        //         if($scope.appointments[i].appointmentId == id){
        //             console.log("app.monitoring.new" + $scope.appointments[i].patientId + " "+ $scope.appointments[i].date);
        //             $state.go('app.monitoring.new', {patientId:$scope.appointments[i].patientId, date:$scope.appointments[i].date});     
        //             break;
        //         }   
        //     }
        // }
    };

    $scope.toggleFunction = function(){
        $scope.toggle = !$scope.toggle;
        if($scope.toggle){
            $scope.getAppointments($scope.prevSetFilter);
        }else{
            $scope.futureAppointments();
        }
        
    };
    $scope.getAppointments = function(filter){
        $scope.dataReceived = false;
        $scope.currentFilter = filter;
        $scope.prevSetFilter = filter;
        var object = {};
        if(filter == 'all'){
            $scope.today = false;
            $scope.all = true;
            $scope.future = false;
            object['filter'] = 'appointments';
            $scope.filter = 'appointments';
            $scope.filterVal='All';
        }
        if(filter == 'pastAppointments'){
            // $scope.pastAppointments();
            $scope.today = false;
            $scope.future = false;
            object['filter'] = filter;
            $scope.filter = 'pastAppointments';
            $scope.filterVal = "Past ";
        }
        if(filter == 'cancelledAppointments') {
            $scope.today = false;
            $scope.future = false;
            object['filter'] = filter;
            $scope.filter = 'cancelledAppointments';
            $scope.filterVal = "cancelled ";


        }
        if(filter == 'allAttended'){
            $scope.today = false;
            $scope.future = false;
            object['filter'] = 'pastAppointments';
            object['attended'] = true;
            $scope.filter = 'pastAppointments';
            $scope.filterVal = "all attended";


        }
        if(filter == 'allUnAttended'){
            $scope.today = false;
            $scope.future = false;
            object['filter'] = 'pastAppointments';
            object['attended'] = false;   
            $scope.filter = 'pastAppointments';
            $scope.filterVal = "all Unattended";


        }
        //by default when fetch future if any pending will fetch pending
        // if(filter == 'allPending'){
        //     object['filter'] = 'futureAppointments';
        //     object['attended'] = null;
        //     object['cancelled'] = false;
        //     object['date'] = new Date();
        // }
        if(filter == ''){
            $scope.today = false;
            $scope.future = false;
        }
        appointmentFactory.getFilteredAppointments(authorize.getCentre()).query(object,function(results){
            $scope.appointments = results;
            $scope.dataReceived = true ;
            $scope.initCardContent();
            // $scope.past 
        });
    };

    $scope.initCardContent = function(){
        if($scope.appointments.length > 0){
            $scope.currentDate = $scope.appointments[0].date;
            $scope.currentShift = $scope.appointments[0].shiftNumber;
        }
    };
    $scope.changeShift = function(shift){
        $scope.currentShift = shift;
        return 'Shift ' + shift;
    };
    $scope.changeDate = function(date){
        var val = ($scope.currentDate != date);
        if(val) {
            $scope.currentDate = date;
            $scope.currentShift = 0;
        }
        return val;
    };
    $scope.viewAppointmentDetails = function(id){
        console.log("filter:" + $scope.filter);
        $state.go("app.appointment.viewAppointments.details",{id:id,filter:$scope.filter});    
    };

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