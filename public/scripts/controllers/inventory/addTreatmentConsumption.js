'use strict';
angular.module('App')
.controller('AddTreatmentConsumptionController',['$scope','authorize','appointmentFactory', function($scope,authorize,appointmentFactory){
	
	
	$scope.showAlert=false;
		
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