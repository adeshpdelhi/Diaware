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
.service('authorize', ['$localStorage', function ($localStorage) {

  var logged_in_user = $localStorage.get('username','');
  var logged_in_centre = $localStorage.get('centre','');
  var logged_in = false;
  if(logged_in_user !== ''){
    logged_in = true;
  }
  // var users = [];
  // userFactory.getUsers().query(function(response){
  //   users =response;
  // });
  var users =  [
  {
    username: "rishabh",
    password : "12345",
    centres : ["JP","CH","JP1"]
  },
  {
    username: "admin",
    password : "admin",
    centres : ["JP","CH","AP","SP","JP1"]
  }
  ];

  this.doAuth = function(username,password){
      for(var i=0;i<users.length;i++){
        if(users[i].username == username && users[i].password == password){
          logged_in_user=username;
          logged_in=true;
          $localStorage.store('username',users[i].username);
          return users[i].centres;
        }
      }
      return false;
    };
  this.getUsername = function(){
      return logged_in_user;
    };
  this.setCentre = function(centre){
      $localStorage.store('centre', centre);
      logged_in_centre = centre;
    };
  this.getCentre = function(centre){
      return logged_in_centre;
    };
  this.isLoggedIn = function(){
      // console.log("Logged in: "+logged_in+" "+logged_in_centre);
      return logged_in;
    };
  this.logout = function(){
      logged_in=false;
      logged_in_user='';
      logged_in_centre='';
      $localStorage.store('username','');
      $localStorage.store('centre','');
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