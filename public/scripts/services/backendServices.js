'use strict';
angular.module('App')
	.service('backendFactory', ['$resource', 'baseURL', function($resource,baseURL) {
		this.getCentres = function(){
      		return $resource(baseURL+"centres/:id",null,  {'update':{method:'PUT' }});
     	};
     	this.getPanels = function(){
     		return $resource(baseURL+"panels/:panelId", null,{'update':{method:'PUT'}});
     	}
  }])
;