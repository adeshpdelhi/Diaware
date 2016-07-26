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
        this.getFutureAppointments = function(centreId){
        	return $resource(baseURL+":centreId/futureAppointments/:appointmentId",{centreId:centreId},  {
          	'update':{method:'PUT' },
        	query: {
              method: 'get', 
              isArray: true,
              interceptor: {
                response: function(response) {      
                var result = response.resource;        
                result.$status = response.status;
                return result;
              }
            }
          },
          get:{
                method:'GET',
                interceptor: {
                  response: function(response) {      
                  var result = response.resource;        
                  result.$status = response.status;
                  return result;
                }
              }
            }
          
          });
        };
        this.getPastAppointments = function(centreId){
        	return $resource(baseURL+":centreId/pastAppointments/:appointmentId",{centreId:centreId},  {
          	'update':{method:'PUT' },
        	query: {method: 'get', isArray: true}
          });
        };
        this.getCancelledAppointments = function(centreId){
          return $resource(baseURL+":centreId/cancelledAppointments/:appointmentId",{centreId:centreId},  {
            'update':{method:'PUT' },
          query: {method: 'get', isArray: true}
          });
        };
        this.getFilteredAppointments = function(centreId){
          return $resource(baseURL+":centreId/:filter/:appointmentId",{centreId:centreId},  {
            'update':{method:'PUT' },
          query: {method: 'get', isArray: true}
          });
        }
  }])
;