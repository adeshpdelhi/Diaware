'use strict';

angular.module('App')
.controller('AddCentreController',['$scope','authorize','backendFactory', function ($scope, authorize,backendFactory) {
	//$scope.activeUser = authorize.getActiveUser();
	$scope.showalert_add_centre=false;
	$scope.addCentre={
		id:null, 
		name:null,
		location: null,
		maxPatients:null, 
		accessLinesAvailable:null,
		patientCount:null,
		noOfShiftsPerDay:null,
		OPDTotalNegativeMachines:null,
		OPDTotalCPositiveMachines:null, 
		OPDTotalBPositiveMachines:null,
		OPDTotalHIVMachines:null,
		IPD_ICUTotalNegativeMachines:null, 
		IPD_ICUTotalCPositiveMachines:null,
		IPD_ICUTotalBPositiveMachines:null,
		IPD_ICUTotalHIVMachines:null
		
		};
		
		
		
		$scope.addNewCentre = function(){
			backendFactory.getCentres().save($scope.addCentre).$promise.then(function(response){
				
				console.log($scope.addCentre);
				$scope.showalert_add_centre=true;
				$scope.addCentreForm.$setPristine();
				$scope.addCentre={
					id:null, 
					name:null,
					location: null,
					maxPatients:null, 
					accessLinesAvailable:null,
					patientCount:null,
					noOfShiftsPerDay:null,
					OPDTotalNegativeMachines:null,
					OPDTotalCPositiveMachines:null, 
					OPDTotalBPositiveMachines:null,
					OPDTotalHIVMachines:null,
					IPD_ICUTotalNegativeMachines:null, 
					IPD_ICUTotalCPositiveMachines:null,
					IPD_ICUTotalBPositiveMachines:null,
					IPD_ICUTotalHIVMachines:null
					
				};
		
		},function(response){
			console.log(response);
			$scope.showalert_add_centre=false;
			

		}
		);
		}
		

	
	
}]);
