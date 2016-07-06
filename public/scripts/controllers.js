'use strict';

angular.module('App')

.controller('LoginController', ['$scope', 'authorize', '$state', function ($scope, authorize, $state) {
    
    $scope.credentials = {username: "", password: "", centre: ""};
    $scope.display_centre = false;
    $scope.doLogin = function(){
        if(authorize.doAuth($scope.credentials.username,$scope.credentials.password)){
            var tempcentres = authorize.doAuth($scope.credentials.username,$scope.credentials.password);
            $scope.channels=[];
            for(var i = 0; i<tempcentres.length; i++ ){
                $scope.channels.push({value: tempcentres[i], label: tempcentres[i]});
            }
            $scope.display_centre=true;
        }
    };
    $scope.chooseCentre = function(){
        authorize.setCentre($scope.credentials.centre);
        console.log("centre set to "+$scope.credentials.centre);
        $state.go('app.home', {}, {reload: true});
    };

}])

.controller('HomeManagementController', ['$scope', '$state', 'authorize', function ($scope, $state, authorize) {
    if(authorize.isLoggedIn() === true)
        $state.go('app.home', {}, {reload: true});
    else
        $state.go('app.login', {}, {reload: true});
}])

.controller('HeaderController', ['$scope', '$state', 'authorize', function ($scope, $state, authorize) {
    $scope.stateis = function(curstate) {
       return $state.includes(curstate);  
    };
    $scope.loggedIn = authorize.isLoggedIn();
    $scope.username = authorize.getUsername();
    $scope.centre = authorize.getCentre();
    $scope.logout = function(){
        authorize.logout();
        $state.go('app', {}, {reload: true});
    };
}])

.controller('FooterController', ['$scope', '$state', 'authorize', function ($scope, $state, authorize) {
    $scope.loggedIn = authorize.isLoggedIn();
}])

.controller('ClinicalEventController',['$scope','patientFactory','ClinicalEventsFactory', '$stateParams','choosePatientFactory', function($scope,patientFactory,ClinicalEventsFactory, $stateParams,choosePatientFactory){
		$scope.events=[];
		$scope.event = {
			date:'',
			clinicaldetails:"",
			comments:""
		};
		
		$scope.saveEvent=function(){
			$scope.events.push($scope.event);
			console.log($scope.event);
			ClinicalEventsFactory.updateEvents($scope.events);
			$scope.clinicaleventForm.$setPristine();
			$scope.event = {
				date:'',
				clinicaldetails:"",
				comments:""
	        };
		};
		

}])
    .controller('ChoosePatientController',['$scope','patientFactory','choosePatientFactory','$state','$stateParams', function($scope,patientFactory, choosePatientFactory, $state, $stateParams){
        $scope.patient = {
            id:"",
            name:"",
            contact:""
        };
        var pats= patientFactory.getPatients();
        $scope.patients = patientFactory.getPatients();
        $scope.redirect = function(id){
        	choosePatientFactory.setPatient(id);
        	var callback = $stateParams.callback;
        	$state.go('app.'+callback);
        };
    }])

 .controller('ViewRegistrationController',['$scope','patientFactory','choosePatientFactory', function($scope, patientFactory, choosePatientFactory){
        $scope.patient = patientFactory.getPatient(choosePatientFactory.getChosenPatient().id);
    }])


 .controller('NewRegistrationController',['$scope','patientFactory', function($scope, patientFactory){
        $scope.newpatient_basic = {  patientId:'' , name: 'adesh' ,age: '' , DOB: '' , gender: '' , contact: '' , 
							alternativeContact: '' , location: '' , address: '' , bloodGroup: '' , transplantWaitingList: '' ,
							maritalStatus: '' , emergencyContactName: '' , emergencyContactRelationship: '' , 
							emergencyContactMobile: '' , numberOfChildren: '' , childrenContact: '' , employementStatus: '' ,
							officeName: '' , officeAddress: '' , otherClinicalDetails: '' , modeOfPayment: '' , refferedBy: '',
                            doctorName: '' , viralMarketStatus: '' , centreId: '' };
							
		$scope.newpatient_panel = {panelId:'',patientId:'',panelPermissionDateFrom:'',panelPermissionDateTo:'',totalTmtsPermitted:'',
									panelPermissionNumber:'',totalTmtsRemaining:'',renewalDate:'',lastModifiedBy:''};
									
		//$scope.newpatient_medical = {patientId:'',}
        $scope.save_basic_details = function(){
            // patientFactory.getPatients().query(function(patients){
            //     patients.push($scope.newpatient);
            //     patients.$save();
            // });
            $scope.newpatient.lastModifiedBy = 'adesh pandey';
            $scope.newpatient.patientId = '123879';
            patientFactory.getPatients().save($scope.newpatient);
        };
    }])


  .controller('MonitoringController',['$scope','patientFactory','choosePatientFactory', function($scope, patientFactory, choosePatientFactory){
       
        $scope.patient = patientFactory.getPatient(choosePatientFactory.getChosenPatient().id);
    }])
	
	.controller('DialysisCarePlanController',['$scope','patientFactory','choosePatientFactory', function($scope, patientFactory, choosePatientFactory){
       
        $scope.patient = patientFactory.getPatient(choosePatientFactory.getChosenPatient().id);
    }])
;