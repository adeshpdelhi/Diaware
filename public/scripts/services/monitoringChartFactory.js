'use strict';
angular.module('App')
	.service('monitoringChartFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    this.getPreBasic = function(id){
      	return $resource(baseURL+"monitoringChart/:id/pre/basic/:preBasicId",{id:id},  {'update':{method:'PUT' }});
    };
    this.getPreBasicMedicals = function(id){
    	console.log(id);
    	return $resource(baseURL+"monitoringChart/:id/pre/basicMedical/:preBasicId",{id:id},{
    		'update':{method:'PUT'}
    	}); 
    };
    this.getPreMachineFinalChecks = function(id){
	   	console.log(id);
        return $resource(baseURL+"monitoringChart/:id/pre/machineCheck/:preBasicId",{id:id},{
    		'update':{method:'PUT'}
    	}); 
    };
    this.getPreAssessments = function(id){
		  console.log(id);
        return $resource(baseURL+"monitoringChart/:id/pre/assessment/:preBasicId",{id:id},{
    		'update':{method:'PUT'}
    	}); 
    };
    this.getPreAccessAssessments = function(id){
        console.log(id);
        return $resource(baseURL+"monitoringChart/:id/pre/accessAssessment/:preBasicId",{id:id},{
            'update':{method:'PUT'}
        }); 
    };
    this.getPost = function(id){
        console.log(id);
        return $resource(baseURL+"monitoringChart/:id/post/:postId",{id:id},{
            'update':{method:'PUT'}
        });
    };
    this.getIntra = function(id){
        console.log(id);
        return $resource(baseURL+"monitoringChart/:id/intra/:intraId",{id:id},{
            'update':{method:'PUT'}
        });
    };
    // this.getPatientCarePlans = function(id){
    //     console.log(id);
    //     return $resource(baseURL+"monitoringChart/:id/pre/basicMedical",{id:id},{
    //         'update':{method:'PUT'}
    //     });
    // };
  }])
;