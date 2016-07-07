'use strict';
angular.module('App')
 	.controller('NewRegistrationController',['$scope','patientFactory','backendFactory','authorize', function($scope,patientFactory,  backendFactory, authorize){
 		var counter = 0;
 		var centre = authorize.getCentre();
        backendFactory.getCentres().get({id:authorize.getCentre()})
        	.$promise.then(function(data){
        		counter = data.patientCount;
       			},function(response){
       				console.log("Error" + response.status +" " + response.statusText);
        		}
        	);

        $scope.newpatient_basic = {  id:null , name: null ,age: null , DOB: null , gender: null , contact: null , 
							alternativeContact: null , location: null , address: null , bloodGroup: null , transplantWaitingList: null ,
							maritalStatus: null , emergencyContactName: null , emergencyContactRelationship: null , 
							emergencyContactMobile: null , numberOfChildren: 0 , childrenContact: null , employementStatus: null ,
							officeName: null , officeAddress: null , otherClinicalDetails: null , modeOfPayment: null , refferedBy: null,
                            doctorName: null , viralMarketStatus: null , centreId: null };

		var currrentYear = (new Date()).getFullYear();	
		
		$scope.setAge = function(){
			console.log($scope.newpatient_basic.DOB);
			var dobyear = $scope.newpatient_basic.DOB.getFullYear();
			console.log(dobyear);
			$scope.newpatient_basic.age = currrentYear - dobyear;		
		};
											
        $scope.save_basic_details = function(){ 

            $scope.newpatient_basic.lastModifiedBy = authorize.getUsername();
            console.log($scope.newpatient_basic.lastModifiedBy);

			$scope.newpatient_basic.centreId = centre;
			console.log($scope.newpatient_basic.centreId);
			
			$scope.newpatient_basic.id = centre + "-"+ currrentYear.toString() + "-"+ counter.toString();
			console.log($scope.newpatient_basic);
			backendFactory.getCentres().update({id:centre},{patientCount: counter+1});

			if($scope.newpatient_basic.emergencyContactMobile === "") $scope.newpatient_basic.emergencyContactMobile = null;
			if($scope.newpatient_basic.contact === "") $scope.newpatient_basic.contact = null;
			if($scope.newpatient_basic.alternativeContact === "") $scope.newpatient_basic.alternativeContact = null;
			if($scope.newpatient_basic.childrenContact === "") $scope.newpatient_basic.childrenContact = null;
			console.log($scope.newpatient_basic);
            patientFactory.getPatients().save($scope.newpatient_basic);
        };
    }])
;

 