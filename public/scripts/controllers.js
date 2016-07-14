'use strict';

angular.module('App')

.controller('LoginController', ['$scope', 'authorize', '$state', 'backendFactory', function ($scope, authorize, $state, backendFactory) {
    
    $scope.credentials = {username: "", password: "", centre: ""};
    $scope.display_centre = false;
    $scope.doLogin = function(){
        authorize.doAuth($scope.credentials.username,$scope.credentials.password, function(user){
        //console.log ('success is '+success);
        if(user !=null){
            console.log('successful login in controller');
            var tempcentres = user.centres;
            $scope.channels=[];
            for(var i = 0; i<tempcentres.length; i++ ){
                $scope.channels.push({value: tempcentres[i], label: tempcentres[i]});
            }
            $scope.display_centre=true;
        }
        else
            alert('Login failed');
        });
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
    $scope.stateis = function(curstate) {
       return $state.includes(curstate);  
    }; 
    $scope.loggedIn = authorize.isLoggedIn();
    $scope.username = authorize.getUsername();
    $scope.centre = authorize.getCentre();

    $scope.credentials={};
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


    $scope.logout = function(){
        authorize.logout();
        $state.go('app', {}, {reload: true});
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

 
;