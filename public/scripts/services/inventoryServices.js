'use strict';
angular.module('App')
	.service('inventoryFactory', ['$resource', 'baseURL', function($resource,baseURL) {
		this.getVendors = function(centreId){
      		return $resource(baseURL+":centreId/inventory/vendor/:vendorId",null,  {'update':{method:'PUT' }});
     	};
		
		this.getIndents = function(centreId){
			return $resource(baseURL+":centreId/inventory/indent/:indentId",null,  {'update':{method:'PUT' }});

		}
		
		this.getIndentsItems = function(centreId,indentId){
			return $resource(baseURL+":centreId/inventory/indent/:indentId/indentitems/:itemNumber",null,  {'update':{method:'PUT' }});

		}
     	
     	
     	
  }])
;
