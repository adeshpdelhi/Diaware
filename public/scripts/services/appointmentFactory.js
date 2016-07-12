'use strict';
angular.module('App')
	// .constant("baseURL","https://localhost:3443/api/")
	.service('appointmentFactory', ['$resource','baseURL' ,function($resource,baseURL){
        this.getSchedules = function(centreId){
          return $resource(baseURL+":centreId/schedulePatient",{centreId:centreId},  {
          	'update':{method:'PUT' },
        	query: {method: 'get', isArray: false}

          });
        };
  }])
;