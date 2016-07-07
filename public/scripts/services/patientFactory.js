'use strict';
angular.module('App')
	.service('patientFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    this.getPatients = function(){
      	return $resource(baseURL+"patients/:id",null,  {'update':{method:'PUT' }});
    };
    this.getPatientPanels = function(id){
    	console.log(id);
    	return $resource(baseURL+"patients/:id/panelDetails/:panelId",{id:id},{
    		'update':{method:'PUT'}
    	}); 
    }
  }])
;