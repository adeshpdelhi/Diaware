'use strict';
angular.module('App')
	.service('inventoryFactory', ['$resource', 'baseURL', function($resource,baseURL) {

		this.getItems = function(){
      		return $resource(baseURL+"inventory/item/:itemId",null,  {'update':{method:'PUT' }});
     	};

		this.getDialysisItems = function(centreId){
      		return $resource(baseURL+":centreId/inventory/treatementitems/dialysis/:itemId",{centreId:centreId},  {'update':{method:'PUT' }});
     	};

     	this.getCatheterizationItems = function(centreId){
      		return $resource(baseURL+":centreId/inventory/treatementitems/catheterization/:itemId",{centreId:centreId},  {'update':{method:'PUT' }});
     	};

		this.getVendors = function(){
      		return $resource(baseURL+"inventory/vendor/:vendorId",null,  {'update':{method:'PUT' }});
     	};
		
		this.getIndents = function(centreId){
			return $resource(baseURL+":centreId/inventory/indent/:indentId",{centreId:centreId},  {'update':{method:'PUT' }});
		}
		
		this.getIndentItems = function(centreId,indentId){
			return $resource(baseURL+":centreId/inventory/indent/:indentId/items/:itemId/:linkedStatus",{centreId:centreId,indentId:indentId},  {'update':{method:'PUT' }});
		}
     	
     	this.getStocks = function(centreId){
			return $resource(baseURL+":centreId/inventory/stock/:itemId",{centreId:centreId},  {'update':{method:'PUT' }});
		}

		this.getFloor = function(centreId){
			return $resource(baseURL+":centreId/inventory/floor/:itemId",{centreId:centreId},  {'update':{method:'PUT' }});
		}

     	this.getStocksIssued = function(centreId){
			return $resource(baseURL+":centreId/inventory/stock/issued/:stockIssuedId",{centreId:centreId},  {'update':{method:'PUT' }});
		}

		this.getStockIssuedItems = function(centreId,stockIssuedId){
			return $resource(baseURL+":centreId/inventory/stock/issued/:stockIssuedId/items/:itemId",{centreId:centreId,stockIssuedId:stockIssuedId},  {'update':{method:'PUT' }});
		}
		
		this.getConsumptions = function(centreId){
			return $resource(baseURL+":centreId/inventory/consumption/:treatementId",{centreId:centreId},  {'update':{method:'PUT' }});
		}
		
		this.getConsumptionItems = function(centreId,treatementId){
			return $resource(baseURL+":centreId/inventory/consumption/:treatementId/items/:itemId",{centreId:centreId,treatementId:treatementId},  {'update':{method:'PUT' }});

		}
     	
  }])
;
