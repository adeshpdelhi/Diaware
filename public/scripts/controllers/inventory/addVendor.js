'use strict';
angular.module('App')
.controller('AddVendorController',['$scope','authorize', function($scope,authorize){
	
	$scope.showalert_add_vendor=false;
		
		$scope.addVendor= {
			vendorId:null,
			vendorName:null,
			vendorAddress:null,
			vendorTinNo:null,
			vendorContactPerson:null,
			vendorContactNo:null,
			vendorIndroducedBy:null,
			vendorIntroducedByPersonName:null,
			saved:false
		};
		
		// need to add attributes of editable table given in excel
		
		$scope.saveVendor = function(){
			
		}
	
	}])
;