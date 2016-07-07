'use strict';
// var db = require('../../../../app/models');
angular.module('App')
 .controller('NewRegistrationController',['$scope','patientFactory','authorize', function($scope, patientFactory, authorize){
        $scope.newpatient_basic = {  id:'' , name: '' ,age: '' , DOB: '' , gender: '' , contact: '' , 
							alternativeContact: '' , location: '' , address: '' , bloodGroup: '' , transplantWaitingList: '' ,
							maritalStatus: '' , emergencyContactName: '' , emergencyContactRelationship: '' , 
							emergencyContactMobile: '' , numberOfChildren: '' , childrenContact: '' , employementStatus: '' ,
							officeName: '' , officeAddress: '' , otherClinicalDetails: '' , modeOfPayment: '' , refferedBy: '',
                            doctorName: '' , viralMarketStatus: '' , centreId: '' };

        // $scope.newpatient_basic=;

		var currrentYear = (new Date()).getFullYear();	
		$scope.setAge = function(){
			console.log($scope.newpatient_basic.DOB);
			// var	dobyear = parseInt($scope.newpatient_basic.DOB.split("/")[2]);
			var dobyear = $scope.newpatient_basic.DOB.getFullYear();
			console.log(dobyear);
			$scope.newpatient_basic.age = currrentYear - dobyear;		
		};
		// $scope.newpatient_panel = {panelId:'',patientId:'',panelPermissionDateFrom:'',panelPermissionDateTo:'',totalTmtsPermitted:'',
									// panelPermissionNumber:'',totalTmtsRemaining:'',renewalDate:'',lastModifiedBy:''};
									
		var counter = 2; // fetch patient count from db

        $scope.save_basic_details = function(){ // lastModified by the person logged in
            $scope.newpatient_basic.lastModifiedBy = authorize.getUsername();
            console.log($scope.newpatient_basic.lastModifiedBy);
			$scope.newpatient_basic.centreId = authorize.getCentre();
			console.log($scope.newpatient_basic.centreId);
			$scope.newpatient_basic.id = authorize.getCentre() + "-"+ currrentYear.toString() + "-"+ counter.toString();
			console.log($scope.newpatient_basic);
			if($scope.newpatient_basic.emergencyContactMobile === "") $scope.newpatient_basic.emergencyContactMobile = null;
			if($scope.newpatient_basic.contact === "") $scope.newpatient_basic.contact = null;
			if($scope.newpatient_basic.alternativeContact === "") $scope.newpatient_basic.alternativeContact = null;
			if($scope.newpatient_basic.childrenContact === "") $scope.newpatient_basic.childrenContact = null;
			console.log($scope.newpatient_basic);
            patientFactory.getPatients().save($scope.newpatient_basic);
        };
    }])
;

 