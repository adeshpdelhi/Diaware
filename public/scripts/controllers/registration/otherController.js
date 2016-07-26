'use strict';
angular.module('App')
.controller('OtherController',['$scope','patientFactory','authorize','regularForm', function($scope, patientFactory,authorize, regularForm){
		$scope.regularForm = regularForm.regularForm;
		$scope.savedOnce = false;
		if(!$scope.view || (!$scope.newPatient_Others && $scope.patient != null)){
			$scope.newPatient_Others = {
				patientId:$scope.view?$scope.patient.id:$scope.newpatient_basic.id,
				aadhar:null,
				PAN:null,
				passport:null,
				otherCard1:null,
				otherCard2:null,
				otherCard3:null,
				aadharData:null,
				PANData:null,
				passportData:null,
				otherCard1Data:null,
				otherCard2Data:null,
				otherCard3Data:null,
				lastModifiedBy:null,
				new:true
			};	
		}
		$scope.showalert_others=false;
		$scope.saveOtherDetails = function(){
			console.log("hello"+$scope.newPatient_Others.PANData);
			$scope.newPatient_Others.patientId = $scope.newpatient_basic.id;
			$scope.newPatient_Others.lastModifiedBy = $scope.newpatient_basic.lastModifiedBy;

			console.log($scope.newPatient_Others.patientId);
			console.log($scope.newPatient_Others);
			patientFactory.getPatientOtherDetails($scope.newPatient_Others.patientId,authorize.getCentre()).save($scope.newPatient_Others).$promise.then(function(response){
				$scope.showalert_others=true;
			},function(response){
				$scope.showalert_others=false;
				console.log(response);
			});			//$scope.showalert_basic_details=true;
			//$scope.showalert_others=true;
			$scope.savedOnce=true;
		};

		$scope.updateOtherDetails = function(){
			$scope.newPatient_Others.lastModifiedBy = authorize.getUsername();
			console.log($scope.newPatient_Others);
			if(!$scope.newPatient_Others.new){
				patientFactory.getPatientOtherDetails($scope.newPatient_Others.patientId,authorize.getCentre()).update($scope.newPatient_Others)
				.$promise.then(function(response){
					console.log(response);
					$scope.updateMyValuesFromOthers(false,true,"Updated Successfully!");
				},function(response){
					$scope.updateMyValuesFromOthers(false,true,"Error: "+response.status+" "+ response.statusText + "!");
				});
			}
			else{
				$scope.newPatient_Others.patientId = $scope.patient.id;
				$scope.newPatient_Others.lastModifiedBy = authorize.getUsername();

				console.log($scope.newPatient_Others.patientId);
				console.log($scope.newPatient_Others);
				patientFactory.getPatientOtherDetails($scope.newPatient_Others.patientId,authorize.getCentre()).save($scope.newPatient_Others)
				.$promise.then(function(response){
					console.log(response);
					$scope.updateMyValuesFromOthers(false,true,"Updated Successfully!");
				},function(response){
					$scope.updateMyValuesFromOthers(false,true,"Error: "+response.status+" "+ response.statusText + "!");
				});
			}
		};
		$scope.saveFile = function(element){
			// var reader = new FileReader();
			console.log(element.files);
			// console.log(new Blob(element.files[0]));
			// $scope.newPatient_Others.PANData = reader.readAsBinaryString(element.files[0]);
			// console.log($scope.newPatient_Others.PANData);
			// patientFactory.getPatientOtherDetails($scope.newPatient_Others.patientId).save($scope.newPatient_Others);

			// var fd = new FormData();
			// fd.append('file',element.files[0]);
			// console.log(fd);
			// var buffer = new Buffer(fd);
		};

}])
;