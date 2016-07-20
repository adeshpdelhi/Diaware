'use strict';
angular.module('App')
.controller('TreatmentInventoryController',['$scope','authorize', function($scope,authorize){
	
	
	$scope.showalert_treatment_inventory=false;
		
		$scope.treatmentInventory= {
			treatmentId:null,
			treatmentType:null,
			saved:false
		};
		
		// need to add attributes of editable table given in excel
		
		$scope.saveTreatmentInventory = function(){
			
		}
	
	}])
;