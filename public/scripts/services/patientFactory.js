'use strict';
angular.module('App')
	.service('patientFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    // var patients = [
    //   {
    //     id:"JP/16/1",
    //     name:"aishwarya",
    //     contact:1234567890
    //   },{
    //     id:"AP/16/2",
    //     name: "adesh",
    //     contact:9876543210
    //   },
    //   {
    //     id:"JP/16/3",
    //     name:"rishabh",
    //     contact:8765432109
    //   }
    // ];
    // this.getPatients = function(){
    //   return patients;
    // };
    this.getPatient = function(id){
      for (var i = patients.length - 1; i >= 0; i--) {
        if(patients[i].id == id) 
          return patients[i]; 
      }
      return null;
    };
    this.getPatients = function(){
      return $resource(baseURL+"registration/:id",null,  {'update':{method:'PUT' }});
     };
  }])
;