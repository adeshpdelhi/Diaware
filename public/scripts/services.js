'use strict';

angular.module('App')
.constant("baseURL","https://localhost:3443/api/")
.factory('$localStorage', ['$window', function ($window) {
  return {
    store: function (key, value) {
      $window.localStorage[key] = value;
    },
    get: function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    remove: function (key) {
      $window.localStorage.removeItem(key);
    },
    storeObject: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function (key, defaultValue) {
      return JSON.parse($window.localStorage[key] || defaultValue);
    }
  };
}])
.service('authorize', ['$localStorage','baseURL', '$http', '$cookies', '$resource', function ($localStorage, baseURL, $http, $cookies, $resource) {

  // var logged_in_user = $localStorage.get('username','');
  // var logged_in_centre = $localStorage.get('centre','');
  var logged_in = false;
  var logged_in_user = '';
  var logged_in_centre = '';
  logged_in_user = $cookies.get('usernamelocal');
  if(logged_in_user!=null && logged_in_user!='')
  {
    logged_in=true;
    logged_in_centre = $localStorage.get('centrelocal','');
  }
  // if(logged_in_user !== ''){
  //   logged_in = true;
  // }
  // var users = [];
  // userFactory.getUsers().query(function(response){
  //   users =response;
  // });
  // var users =  [
  // {
  //   username: "rishabh",
  //   password : "12345",
  //   centres : ["JP","CH","JP1"]
  // },
  // {
  //   username: "admin",
  //   password : "admin",
  //   centres : ["JP","CH","AP","SP","JP1"]
  // }
  // ];
  var users = $resource(baseURL+"users/:username",null,  {'update':{method:'PUT' }});
  this.doAuth = function(username,password,next){

          //   users.login({username: username, password:password}).$promise.then(function(response){
          //         if(response=='success'){
          //              logged_in_user=username;
          //              logged_in=true;
          // //             $localStorage.store('username',username);
          //              console.log('successful login in services :'+logged_in);
          //              return true;
          //        }
          //       else
          //         {
          //             alert('login failed '+ response);
          //             console.log('failed login '+response);
          //             return false;
          //         }


          //      }); 

          $http({
            method: 'POST',
            url: baseURL+'users/login',
            data: {username: username, password: password}
          }).then(function successCallback(response) {
                if(response.status==200){
                       logged_in_user=username;
                       logged_in=true;
          //             $localStorage.store('username',username);
                       console.log('successful login in services :'+logged_in);
                       users.get({username: username})
                        .$promise.then(function(user){
                            //$localStorage.store('centrelocal',username);
                          next(user);
                          },function(response){
                            console.log("Error" + response.status +" " + response.statusText);
                            next(null);
                          }
                        );
                       
                }
                else
                 {
                    //alert('login failed services');
                    next(null);
                 }
            }, function errorCallback(response) {
                  {
                    //alert('login failed services');
                    next(null);
                 }
            });

      // for(var i=0;i<users.length;i++){
      //   if(users[i].username == username && users[i].password == password){
      //     logged_in_user=username;
      //     logged_in=true;
      //     $localStorage.store('username',users[i].username);
      //     return users[i].centres;
      //   }
      // }
      // return false;
    };
    this.getUsers = function(){
        return users;
    }
  this.getUsername = function(){
      return logged_in_user;
    };
  this.setCentre = function(centre){
        $localStorage.store('centrelocal', centre);
        logged_in_centre = centre;
    };
  this.getCentre = function(centre){
      return logged_in_centre;
    };
  this.isLoggedIn = function(){
      // console.log("Logged in: "+logged_in+" "+logged_in_centre);
      //console.log('value sent back '+logged_in);
      return logged_in;
    };
  this.logout = function(){
      logged_in=false;
      logged_in_user='';
      logged_in_centre='';
       $http({
            method: 'POST',
            url: baseURL+'users/logout'
          }).then(function successCallback(response) {
                if(response.status==200){
                       logged_in_user='';
                       logged_in=false;
                       $localStorage.store('centrelocal', '');
          //             $localStorage.store('username',username);
                }
                else
                 {
                    alert('logout failed services');
                    next(null);
                 }
            }, function errorCallback(response) {
                  {
                    alert('logout failed services');
                    next(null);
                 }
            });
       //$localStorage.store('username','');
       //$localStorage.store('centre','');
    };
}])
.service('centreDetails', ['$localStorage','backendFactory', function ($localStorage,backendFactory) {
  var centre = $localStorage.get('centre','');
  var validLoggedIn = true;
  if(centre == '')
    validLoggedIn = false;

  var centreDetails ={};
  if(validLoggedIn){
    console.log('fetching from databaseCentres all the centreDetails');
    backendFactory.getCentres().get({id:centre}).$promise.then(function(response){
      centreDetails = response;
      console.log(centreDetails);
    });
  }
  this.getCentreAvailableAccessLines = function(){
    return centreDetails.availableAccessLines;
  }
  this.getCentreShiftsPerDay = function(){
    return centreDetails.noOfShiftsPerDay;
  }
  this.getCentreLocation = function(){
    return centreDetails.location;
  };
  this.getCentreId = function(){
    return centreDetails.id;
  };

  
}])
.factory('choosePatientFactory',['$localStorage', function($localStorage){
  var patFac = {};
  var patient = $localStorage.getObject('chosenPatient','{}');
  patFac.setPatient = function(id){
    patient = {id: id};
    $localStorage.storeObject('chosenPatient', patient);
  };
  patFac.getChosenPatient = function(){
    return patient;
  };
  return patFac;
}])
;