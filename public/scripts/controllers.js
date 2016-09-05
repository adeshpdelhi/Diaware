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
            console.log('app.'+callback);
            console.log(callback);
        	$state.go('app.'+callback);
        };
    }])

.controller('ChoosePatientMatrixController',['$scope','patientFactory','choosePatientFactory','$state','$stateParams','authorize','appointmentFactory', function($scope,patientFactory, choosePatientFactory, $state, $stateParams,authorize, appointmentFactory){
    var todayDate = new Date();
    $scope.all = false;
    $scope.dateFrom = todayDate; $scope.dateTo = todayDate;
    //todayDate.setHours(23,59,59,999);
    $scope.fetchAllAppointments = function(){
        appointmentFactory.getAppointments(authorize.getCentre()).query(
            function(response){
                console.log(response);
                $scope.appointments = response;        
            },
            function(response){
                console.log("Error" + response.status + " " + response.statusText);
            }
        );
    };
    $scope.fetchAllAppointments();
    $scope.redirect = function(id,appointment){
        choosePatientFactory.setPatient(id);
        choosePatientFactory.setAppointment(appointment);
        var callback = $stateParams.callback;
        $state.go('app.'+callback);
    };
    $scope.toggleAndUpdate = function(){
        $scope.all = !$scope.all;
        if($scope.all){
            $scope.dateFrom = new Date(todayDate.getFullYear(),todayDate.getMonth()-1,todayDate.getDate());
            $scope.dateTo = new Date(todayDate.getFullYear(),todayDate.getMonth()+1,todayDate.getDate());
            //$scope.choosePatientMatrixForm.$setPristine(true);
            // $scope.fetchAllAppointments();

        }
        else
        {
            $scope.dateFrom = todayDate; $scope.dateTo = todayDate;
        }
    }
}])
;