'use strict';
angular.module('App')
.controller('MedicalController',['$scope','patientFactory','authorize', function($scope,patientFactory,authorize){
     $scope.newPatient_Medical={
		diabetes:null,
		diabetesComments:null,
		hypertension:null,
		hypertensionComments:null,
		coronaryArteryDisease:null,
		coronaryArteryDiseaseComments:null,
		peripheralNeuropathy:null,
		peripheralNeuropathyComments:null,
		ratinopathy:null,
		ratinopathyComments:null,
		cerebrovascularDisease:null,
		cerebrovascularDiseaseComments:null,
		respiratoryDisease:null,
		respiratoryDiseaseComments:null,
		malignancy:null,
		malignancyComments:null,
		haemoglobiNopathy:null,
		haemoglobiNopathyComments:null,
		peripheralVascularDisease:null,
		peripheralVascularDiseaseComments:null,
		hepatitisB:null,
		hepatitisBComments:null,
		hepatitisC:null,
		hepatitisCComments:null,
		HIV:null,
		HIVComments:null,
		malnutrition:null,
		malnutritionComments:null,
		drugAllergy:null,
		drugAllergyComments:null,
		// others:null,
		// othersComments:null
	};
	$scope.showalert_medical=false;
	var medicalHistory= {
		patientId:$scope.newpatient_basic,
		diseaseName:null,
		diseasePresent:null,
		doctorComments:null,
		lastModifiedBy:null
	};
	$scope.others = [];
	$scope.other = {
		patientId:$scope.newpatient_basic,
		diseaseName:null,
		diseasePresent:"Yes",
		doctorComments:null,
		lastModifiedBy:null
	};
	$scope.addOthers = function(){
		$scope.showalert_medical=false;
		$scope.other.patientId = $scope.newpatient_basic.id;
		$scope.other.lastModifiedBy = $scope.newpatient_basic.lastModifiedBy;
		$scope.others.push($scope.other);
		$scope.other = {
			patientId:$scope.newpatient_basic,
			diseaseName:null,
			diseasePresent:"Yes",
			doctorComments:null,
			lastModifiedBy:null
		};
		$scope.otherForm.$setPristine();
	}
	var saveOthers = function(){
		$scope.showalert_medical=false;
		for(var i = 0; i< $scope.others.length;i++){
			console.log($scope.others[i]);
				patientFactory.getPatientMedicalHistory($scope.others[i].patientId,authorize.getCentre()).save($scope.others[i]);
		}
	};
	$scope.saveMedical= function(){
		var i = 0;
		console.log($scope.newPatient_Medical);
		for (key in $scope.newPatient_Medical ){
			var value = $scope.newPatient_Medical[key];
			console.log(key +":"+ value);
			if(i%2 == 0)
			{
				medicalHistory= {
					patientId:$scope.newpatient_basic.id,
					diseaseName:key,
					diseasePresent:value,
					doctorComments:null,
					lastModifiedBy:$scope.newpatient_basic.lastModifiedBy
				}			
			}
			if(i%2==1){
				medicalHistory.doctorComments = value;
				console.log(medicalHistory.patientId);
				console.log(medicalHistory);
				patientFactory.getPatientMedicalHistory(medicalHistory.patientId,authorize.getCentre()).save(medicalHistory);
				medicalHistory= {
					patientId:$scope.newpatient_basic.id,
					diseaseName:null,
					diseasePresent:null,
					doctorComments:null,
					lastModifiedBy:null
				};
			}
			i++;
		}
		saveOthers();
		$scope.showalert_medical=true;
	}

}])
;
