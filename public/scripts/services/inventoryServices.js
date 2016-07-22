'use strict';
angular.module('App')
	.service('inventoryFactory', ['$resource', 'baseURL', function($resource,baseURL) {
		this.getVendors = function(){
      		return $resource(baseURL+"vendor/:vendorId",null,  {'update':{method:'PUT' }});
     	};
     	
     	
  }])
;
