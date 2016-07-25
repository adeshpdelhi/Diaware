'use strict';

angular.module('App')
.controller('AddCentreController',['$scope','authorize','backendFactory', function ($scope, authorize,backendFactory) {
	//$scope.activeUser = authorize.getActiveUser();
	$scope.showAlert=false;
	if(!$scope.view){
		$scope.addCentre={
			id:null, 
			name:null,
			location: null,
			maxPatients:0, 
			accessLinesAvailable:[],
			patientCount:1,
			noOfShiftsPerDay:0,
			typesOfMachinesAvailable:[],
			OPDTotalNegativeMachines:null,
			OPDTotalCPositiveMachines:null, 
			OPDTotalBPositiveMachines:null,
			OPDTotalHIVMachines:null,
			IPD_ICUTotalNegativeMachines:null, 
			IPD_ICUTotalCPositiveMachines:null,
			IPD_ICUTotalBPositiveMachines:null,
			IPD_ICUTotalHIVMachines:null	
		};
		console.log('entered');
	}	
	// $scope.addCentre.accessLinesAvailable = [];
	// $scope.addCentre.typesOfMachinesAvailable = [];
	$scope.accessLine = null;
	$scope.machineType = null;
	$scope.savedOnce = false;
	$scope.oldValues = JSON.parse(JSON.stringify($scope.addCentre));
	$scope.addAccessLine = function(){
		if($scope.accessLine != null && $scope.accessLine != '' && $scope.accessLine != " ")
			$scope.addCentre.accessLinesAvailable.push($scope.accessLine);
		$scope.accessLine = null;
	};
	$scope.addMachineType = function(){
		if($scope.machineType != null && $scope.machineType != '' && $scope.machineType != " "){
			$scope[$scope.machineType+'_New'] = true;
			$scope.addCentre.typesOfMachinesAvailable.push($scope.machineType);
		}
		$scope.machineType = null;
		
	};
	$scope.checkNew = function(machineType){
		return $scope[machineType+'_New'];
	}
	$scope.removeMachineType = function(index){
		$scope.addCentre['OPDTotal'+$scope.addCentre.typesOfMachinesAvailable[index]] = null;
		$scope.addCentre['IPD_ICUTotal'+$scope.addCentre.typesOfMachinesAvailable[index]] = null;
		$scope.addCentre.typesOfMachinesAvailable.splice(index,1);
	};
	$scope.removeAccessLine = function(index){
		$scope.addCentre.accessLinesAvailable.splice(index,1);
	};
	$scope.addNewCentre = function(){
		console.log($scope.addCentre);
		console.log('centerId: '+ $scope.addCentre.id);

		backendFactory.getCentres().save($scope.addCentre).$promise.then(function(response){
			console.log('response.id:' +response.id + " " + $scope.addCentre.id);
			if($scope.login){
				console.log('centerId: '+ $scope.addCentre.id);
					$scope.updateValuesFromChild(false,false,'','',$scope.addCentre.id); 
			}
			console.log(response);
			$scope.savedOnce = true;
			$scope.showAlert=true;
			$scope.message =' Successfully Saved Centre Details!';
			$scope.messageColor ="success";
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
			$scope.showAlert=true;
			$scope.message = "Error: "+ response.status + ' ' + response.data + "!. Centre not saved";
			$scope.messageColor = 'danger';
			if($scope.login){
				$scope.updateValuesFromChild(false,true,'Couldnt Add Centre!','danger',""); 
			}
		});
		
	};
	$scope.updateCentre= function(){
		console.log($scope.addCentre);
		backendFactory.getCentres().update({id:$scope.addCentre.id},$scope.addCentre).$promise.then(function(response){
			console.log(response);
			$scope.updateValuesFromChild(false,true,' Successfully Updated Centre Details!','success');
		},function(response){
			console.log(response);
			$scope.updateValuesFromChild(false,true,"Error: "+ response.status + ' ' + response.statusText + "!. Centre not saved",'danger');
		});
	};


	
	
}]);
