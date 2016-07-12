'use strict';
angular.module('App')
	.service('patientFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    this.getPatients = function(centreId){
      	return $resource(baseURL+":centreId/patients/:id",{centreId:centreId},  {'update':{method:'PUT' }});
    };
    this.getPatientPanels = function(id,centreId){
    	console.log(id);
    	return $resource(baseURL+":centreId/patients/:id/panelDetails/:panelId",{id:id,centreId:centreId},{
    		'update':{method:'PUT'}
    	}); 
    };
    this.getPatientOtherDetails = function(id,centreId){
	   	console.log(id);
    	return $resource(baseURL+":centreId/patients/:id/otherDetails",{id:id,centreId:centreId},{
    		'update':{method:'PUT'}
    	}); 
    };
    this.getPatientMedicalHistory = function(id,centreId){
		  console.log(id);
    	return $resource(baseURL+":centreId/patients/:id/medicalHistory",{id:id,centreId:centreId},{
    		'update':{method:'PUT'}
    	}); 
    };
    this.getPatientMajorClinicalEvents = function(id,centreId){
        console.log(id);
        return $resource(baseURL+":centreId/patients/:id/clinicalEvents/:clinicalEventId" ,{id:id,centreId:centreId},{
            'update':{method:'PUT'}
        }); 
    };
    this.getPatientCarePlans = function(id,centreId){
        console.log(id);
        return $resource(baseURL+":centreId/patients/:id/carePlans/:carePlanId" ,{id:id,centreId:centreId},{
            'update':{method:'PUT'}
        });
    };
  }])
;