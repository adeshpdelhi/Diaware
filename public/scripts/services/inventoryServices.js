'use strict';
angular.module('App')
	.service('inventoryFactory', ['$resource', 'baseURL', function($resource,baseURL) {
		this.getVendors = function(){
      		return $resource(baseURL+"vendor",null,  {'update':{method:'PUT' }});
     	};
     	//this.getPanels = function(){
     		//return $resource(baseURL+"panels/:panelId", null,{'update':{method:'PUT'}});
     	//};
     	
  }])
;
/*
,function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    }
*/