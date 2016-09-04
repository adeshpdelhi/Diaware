'use strict';

angular.module('App')
.controller('DashBoardController',['$scope','appointmentFactory','authorize','patientFactory','billFactory','$timeout','$state',function($scope,appointmentFactory,authorize,patientFactory,billFactory,$timeout,$state){
    $scope.allCentresAppointments = false;
    $scope.allCentresStats = false;
    $scope.allCentresBills = false;
    $scope.showContent = false;
    $scope.showContentBills = false;

    $scope.showContentCancelledBills = false;
    $scope.allCentresCancelledBills = false;
    $scope.showCancelledBillsAlert = false;

    $scope.viewTodaysAppointments = function(allCentres){
        $scope.allCentresAppointments = allCentres;
        console.log(new Date());
        var toDate = new Date();
        $scope.today = toDate; 
        toDate.setHours(23,59,59,999);
        appointmentFactory.getFutureAppointments(allCentres?'all':authorize.getCentre()).query({date:toDate},function(results){
            $scope.appointments  = results;
            if($scope.appointments.length==0){
                $scope.showAppointmentAlert = true;
                $scope.message = 'No appointments today';
                $scope.messageColor='warning';     
            }  
            $scope.currentShift = "";
        },function(response){
            $scope.showAppointmentAlert = true;
            $scope.message = 'Error: '+ response.status+ " - "+ response.data;
            $scope.messageColor='danger'; 
        });
    };
    $scope.viewPendingBills = function(allCentres){
        $scope.allCentresBills = allCentres;
        billFactory.getBills(allCentres?'all':authorize.getCentre()).query({status:'Pending'},function(results){
            $scope.bills  = results;
            if($scope.bills.length==0){
                $scope.showPendingBillsAlert = true;
                $scope.messageBills = 'Congratulations No Pending Bills ';
                $scope.messageColorBills='success';     
            }  
            // $scope.currentShift = "";
        },function(response){
            $scope.showPendingBillsAlert = true;
            $scope.messageBills = 'Error: '+ response.status+ " - "+ response.data;
            $scope.messageColorBills='danger'; 
        });
    };
    $scope.viewCancelledBills = function(allCentres){
        $scope.allCentresBills = allCentres;
        billFactory.getBills(allCentres?'all':authorize.getCentre()).query({deleted:true},function(results){
            $scope.billsCancelled  = results;
            if($scope.billsCancelled.length==0){
                $scope.showCancelledBillsAlert = true;
                $scope.messageCancelledBills = 'Congratulations No Cancelled Bills ';
                $scope.messageColorCancelledBills='success';     
            }  
            // $scope.currentShift = "";
        },function(response){
            $scope.showCancelledBillsAlert = true;
            $scope.messageCancelledBills = 'Error: '+ response.status+ " - "+ response.data;
            $scope.messageColorCancelledBills='danger'; 
        });
    };
    $scope.viewBillDetails = function(id,deleted){
        $state.go("app.billing.viewbill.details",{id:id,deleted:deleted});
    }
    $scope.viewAppointmentDetails = function(id){
        // console.log("filter:" + $scope.filter);
        $state.go("app.appointment.viewAppointments.details",{id:id,filter:'futureAppointments'});    
    };
    
    var  getDateString = function(date, format) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        getPaddedComp = function(comp) {
            return ((parseInt(comp) < 10) ? ('0' + comp) : comp)
        },
        formattedDate = format,
        o = {
            "y+": date.getFullYear(), // year
            "M+": months[date.getMonth()], //month
            "d+": getPaddedComp(date.getDate()), //day
            "h+": getPaddedComp((date.getHours() > 12) ? date.getHours() % 12 : date.getHours()), //hour
             "H+": getPaddedComp(date.getHours()), //hour
            "m+": getPaddedComp(date.getMinutes()), //minute
            "s+": getPaddedComp(date.getSeconds()), //second
            "S+": getPaddedComp(date.getMilliseconds()), //millisecond,
            "b+": (date.getHours() >= 12) ? 'PM' : 'AM'
        };

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                formattedDate = formattedDate.replace(RegExp.$1, o[k]);
            }
        }
        return formattedDate;
    };
    $scope.newUserNotification = function(){
        if($scope.role == 'admin'){
            authorize.getUsers().get({latestAddedUser:true}).$promise.then(function(response){
                if(response.username == null){
                    $scope.userNotify = true;
                    $scope.userAlert = true;
                    $scope.usesNotifyMessage = "Something Went wrong... Couldnt fetch data!";
                }   
                if(response.createdAt){
                    var date = new Date(response.createdAt);
                    var today = new Date();
                    console.log(date);
                    console.log(today);
                    console.log("date");
                    // console.log("Date: " + (new Date(date)) + "today " + (new Date(today)) +'!');                                  )
                    if(date <= today && date > (today - 2.5*24*60*60*1000)){
                        console.log("yaaaaaaaaaaay ");
                        $scope.userNotify = true;
                        $scope.userAlert = false;
                        var formattedDate = getDateString(date, "d-M-y")
                        var roles = "";
                        console.log(response);
                        // for(key in user)
                        if(response.admin) {
                            console.log("admin hehheh ");
                            roles = roles.concat('Admin');
                        }
                        if(response.incharge){
                            if(roles === "") roles.push('Incharge');
                            else roles = roles.concat(",Incharge");
                        }
                        if(response.manager){
                            if(roles === "") roles.concat('Manager');
                            else roles = roles.concat(",Manager");
                        }
                        if(response.clinical){
                            if(roles === "") roles.push('Clinical');
                            else roles = roles.concat(",Clinical");
                        }
                        $scope.userNotifyMessage = "Notification: New User (" + response.username + ") added on " + formattedDate + " having roles of " + roles + ".";
                    }
                    else
                    {
                        console.log("whyyyyyyyyyyyyy! :'(");
                        $scope.userNotify = false;
                    }
                }
            },function(response){   
                $scope.userNotify = true;
                $scope.userAlert = true;
                $scope.usesNotifyMessage = "Something Went wrong... Couldnt fetch data!";
            });
        }
    };
 
    $scope.statistics = function(allCentres){
        $scope.allCentresStats = allCentres;
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDayOfThisMonth = new Date(y, m, 1), firstDayOfLastMonth = new Date(y,m-1,1);
        var lastDayOfThisMonth = new Date(y, m + 1, 0),lastDayOfLastMonth = new Date(y,m,0);
        console.log("this months: "+  firstDayOfThisMonth + " - " + lastDayOfThisMonth );
        console.log("last months: "+  firstDayOfLastMonth + " - " + lastDayOfLastMonth );
        console.log("last date of dec: "+ new Date(y,11+1,0) +" ; 1st day of december from jan" + new Date(y,0-1,1));
        if($scope.role.manager || $scope.role.admin || $scope.role.incharge){
            patientFactory.getPatients(allCentres?'all':authorize.getCentre()).get({dateFrom:firstDayOfThisMonth, dateTo:lastDayOfThisMonth, count:true}).$promise.then(function(response){
                $scope.thisMonthsRegistrations = response.count;
            },function(response){
                console.log(response);

            });
            patientFactory.getPatients(allCentres?'all':authorize.getCentre()).get({dateFrom:firstDayOfLastMonth, dateTo:lastDayOfLastMonth, count:true}).$promise.then(function(response){
                $scope.lastMonthsRegistrations = response.count;
            },function(response){
                console.log(response);
                
            });
        }
        if($scope.role.manager || $scope.role.admin || $scope.role.incharge){
            appointmentFactory.getPastAppointments(allCentres?'all':authorize.getCentre()).get({attended:true, count:true}).$promise.then(function(response){
                $scope.thisMonthsAttendedAppointments = response.count;
            },function(response){
                console.log(response);
                
            });
            appointmentFactory.getPastAppointments(allCentres?'all':authorize.getCentre()).get({attended:true, count:true}).$promise.then(function(response){
                $scope.lastMonthsAttendedAppointments = response.count;
            },function(response){
                console.log(response);
                
            });
        }
        if($scope.role.admin){
            billFactory.getBills(allCentres?'all':authorize.getCentre()).get({sum:true,amount:'totalAmount',status:'FullPaid'}).$promise.then(function(response){
                if(!response.sum) $scope.thisMonthsEarnings = 0;
                else $scope.thisMonthsEarnings = response.sum;

            },function(response){
                console.log(response);
            });
            billFactory.getBills(allCentres?'all':authorize.getCentre()).get({sum:true,amount:'totalAmount',status:'FullPaid'}).$promise.then(function(response){
                if(!response.sum)$scope.lastMonthsEarnings = 0;
                else $scope.lastMonthsEarnings = response.sum;
            },function(response){
                console.log(response);
                
            });
        }
    };
   
	$scope.role = authorize.getRole();

    // $timeout(function(){
    // activeUser = authorize.getActiveUser();
    // var activeUser = authorize.getRole();
    // if(activeUser == 'admin')
	// $scope.isAdmin = true;
    //$scope.isAdmin = activeUser.admin;
    $scope.viewTodaysAppointments(false);
    $scope.newUserNotification();
    $scope.statistics(false);
    $scope.viewPendingBills(false);
    $scope.viewCancelledBills(false);

    // },1000);

    // console.log(activeUser);
    console.log("admin "+$scope.role.admin);

}])
;