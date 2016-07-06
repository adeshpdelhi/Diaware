'use strict';
angular.module('App')
	.service('patientFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    this.getPatients = function(){
      return $resource(baseURL+"patients/:id",null,  {'update':{method:'PUT' }});
     };
  }])
;