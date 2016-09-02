'use strict';

angular.module('App')

.controller('LoginController', ['$scope', 'authorize', '$state', 'backendFactory', function ($scope, authorize, $state, backendFactory) {
    $scope.submitCentre = false;
    $scope.includeAddCentre = false;
    $scope.noCentresInDB = false;
    $scope.showAddCentre = false;
    $scope.showAlertAddCentre = false;

    $scope.credentials = {username: "", password: "", centre: ""};
    $scope.display_centre = false;
    $scope.rememberme=false;
    $scope.login = true;

    $scope.doLogin = function(){
        authorize.doAuth($scope.credentials.username,$scope.credentials.password,$scope.rememberme, function(user){
        //console.log ('success is '+success);
        if(user !=null){
            console.log('successful login in controller');
            var tempcentres = user.centres;
            $scope.channels=[];
            for(var i = 0; i<tempcentres.length; i++ ){
                $scope.channels.push({value: tempcentres[i], label: tempcentres[i]});
            }
            $scope.display_centre=true;
            if($scope.channels.length == 1 && $scope.channels[0].value == 'all'){
                $scope.noCentresInDB = true;
                $scope.submitCentre = false;
                if(user.admin) $scope.showAddCentre = true;
                else{
                    $scope.showAlertAddCentre = true;
                }
            }
        }
        else
            alert('Login failed');
        });
    };
    $scope.addedCentre = false;
    $scope.updateValuesFromChild = function(editCentre, alert,message,color,centreId){
        $scope.includeAddCentre = editCentre;
        console.log("centreAdded:"+centreId);
        $scope.channels.push({value: centreId, label: centreId});
        if(centreId!=''&& centreId !=null){
            $scope.noCentresInDB=false;
        }
        $scope.addedCentre = alert;
        $scope.message = message;
        $scope.messageColor = color;
    };
    $scope.chooseCentre = function(){
        authorize.setCentre($scope.credentials.centre);
        console.log("centre set to "+$scope.credentials.centre);
        $state.go('app.home', {}, {reload: true});
    };

}])

.controller('HomeManagementController', ['$scope', '$state', 'authorize', function ($scope, $state, authorize) {
    if(authorize.isLoggedIn() === true)
        $state.go('app.home', {}, {reload: true});
    else
        $state.go('app.login', {}, {reload: true});
}])

.controller('HeaderController', ['$scope', '$state', 'authorize', '$uibModal', function ($scope, $state, authorize, $uibModal) {
    if(authorize.isLoggedIn() === true)
        {

        }
    else if(!$state.is('app.login'))
        $state.go('app.login', {}, {reload: true});
    $scope.stateis = function(curstate) {
       return $state.includes(curstate);  
    }; 
    $scope.loggedIn = authorize.isLoggedIn();
    $scope.username = authorize.getUsername();
    $scope.centre = authorize.getCentre();
    $scope.credentials={};
    $scope.role = authorize.getRole();
    $scope.chooseCentreOpen = function(){
        var user = authorize.getActiveUser();
        var tempcentres = user.centres;
        console.log(user.centres);
        $scope.channels=[];
        for(var i = 0; i<tempcentres.length; i++ ){
            $scope.channels.push({value: tempcentres[i], label: tempcentres[i]});
        }
        console.log($scope.channels);
        var modalInstance = $uibModal.open({
          templateUrl: 'views/chooseCentreModal.html',
          controller: 'ChooseCentreModalController',
          size:'sm' ,
          resolve: {
            channels: function () {
             return $scope.channels;
            }
          }
        });
    };
    $scope.changePasswordOpen = function(){
            var user = authorize.getActiveUser();
            var modalInstance = $uibModal.open({
              templateUrl: 'views/changePasswordModal.html',
              controller: 'ChangePasswordModalController',
              size:'sm' 
            });
        };

    $scope.logout = function(){
        authorize.logout();
        $state.go('app', {}, {reload: true});
    };
}])

.controller('ChangePasswordModalController', ['$scope', '$state', 'authorize', '$uibModalInstance', function ($scope, $state, authorize, $uibModalInstance) {

    $scope.user= authorize.getActiveUser();
    $scope.changePassword = function(){
        if($scope.oldpassword==null || $scope.newpassword==null ||$scope.oldpassword=='' || $scope.newpassword=='')
            {   
                console.log('not all fields specified');
                return;
            }
            // if(crypto.createHash('md5').update($scope.oldpassword).digest("hex")!=$scope.user.password){
            //     alert('wrong old password');
            //     return;
            // }
        authorize.getUsers().update({username:$scope.user.username},{oldpassword: $scope.oldpassword, newpassword:$scope.newpassword}).$promise.then(function(response) {
                alert('Password changed successfully');  
                $uibModalInstance.close();
                console.log('updated password');              
            }, function(response) {
                alert('Wrong old password');
            });;
        

//        $state.go('app.home', {}, {reload: true});
    };
}])

.controller('ChooseCentreModalController', ['$scope', '$state', 'authorize', '$uibModalInstance', 'channels', function ($scope, $state, authorize, $uibModalInstance, channels) {

    $scope.credentials={};
    $scope.channels = channels;
    $scope.chooseCentre = function(){
        authorize.setCentre($scope.credentials.centre);
        console.log("centre set to "+$scope.credentials.centre);
        $uibModalInstance.close();
        $state.go('app.home', {}, {reload: true});

//        $state.go('app.home', {}, {reload: true});
    };
}])



.controller('FooterController', ['$scope', '$state', 'authorize', function ($scope, $state, authorize) {
    $scope.loggedIn = authorize.isLoggedIn();
}])
    .controller('ChoosePatientController',['$scope','patientFactory','choosePatientFactory','$state','$stateParams','authorize', function($scope,patientFactory, choosePatientFactory, $state, $stateParams,authorize){
        $scope.patient = {
            id:"",
            name:"",
            contact:""
        };
        patientFactory.getPatients(authorize.getCentre()).query(
            function(response){
                console.log(response[0]);
                $scope.patients = response;        
            },
            function(response){
                console.log("Error" + response.status + " " + response.statusText);
            }
        );
        $scope.redirect = function(id){
        	choosePatientFactory.setPatient(id);
        	var callback = $stateParams.callback;
        	$state.go('app.'+callback);
        };
    }])

.controller('ChoosePatientMatrixController',['$scope','patientFactory','choosePatientFactory','$state','$stateParams','authorize','appointmentFactory', function($scope,patientFactory, choosePatientFactory, $state, $stateParams,authorize, appointmentFactory){
        appointmentFactory.getAppointments(authorize.getCentre()).query(
            function(response){
                console.log(response);
                $scope.appointments = response;        
            },
            function(response){
                console.log("Error" + response.status + " " + response.statusText);
            }
        );
        $scope.redirect = function(id,appointment){
            choosePatientFactory.setPatient(id);
            choosePatientFactory.setAppointment(appointment);
            var callback = $stateParams.callback;
            $state.go('app.'+callback);
        };
    }])

.controller('DashBoardController',['$scope','appointmentFactory','authorize','patientFactory','billFactory','$timeout','$state',function($scope,appointmentFactory,authorize,patientFactory,billFactory,$timeout,$state){
    console.log("user");
    var activeUser = {} 

    $timeout(function(){
        activeUser = authorize.getActiveUser();
        $scope.isAdmin = activeUser.admin;
        $scope.viewTodaysAppointments(false);
        $scope.newUserNotification();
        $scope.statistics(false);
        $scope.viewPendingBills(false);
        $scope.viewCancelledBills(false);

    },1000);

    console.log(activeUser);
    console.log("admin"+$scope.isAdmin);
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
        appointmentFactory.getAppointments(allCentres?'all':authorize.getCentre()).query({date:toDate},function(results){
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
        if(activeUser.admin){
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
        if(activeUser.manager ||$scope.isAdmin || activeUser.incharge){
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
        if(activeUser.manager ||$scope.isAdmin || activeUser.incharge){
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
        if($scope.isAdmin){
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
   

}])
 
;