
'use strict';
angular.module('App')
.controller('MonitoringPostController',['$scope','patientFactory','choosePatientFactory','authorize','monitoringChartFactory', function($scope, patientFactory, choosePatientFactory, authorize,monitoringChartFactory){
        $scope.post = {
        	patientId:null,
        	postId:null,
        	postWeight:null,
        	weightLoss:null,
        	UFReading:null,
        	BPSitting:null,
        	BPStanding:null,
        	temperature:null,
        	pulse:null,
        	symptomaticHypotension:null,
        	prolongedBleeding:null,
        	bruit:null,
        	subjectiveStatement:null,
        	cardiacStatus:null,
        	respiratoryStatus:null,
        	mentalStatus:null,
        	ambulatoryStatus:null,
        	KtVAchieved:null,
        	EPODosage:null,
        	EPOGivenBy:null,
        	EPOSupply:null,
        	bloodTransfusion:null,
        	numberOfUnits:null,
        	bloodBankName:null,
        	concludedBy:null,
        	anyOtherComments:null,
        	lastModifiedBy:null
        };
        $scope.$watch('post.postWeight',function(newVal, oldVal){
        	$scope.post.weightLoss = $scope.preHDWeight - $scope.post.postWeight;
        })
        $scope.savePost = function(){
        	$scope.post.patientId = $scope.patient.id;
        	$scope.post.postId = $scope.basic.preBasicId;
    		$scope.post.lastModifiedBy = authorize.getUsername();
    		console.log($scope.post);
    		console.log($scope.patient.id);
    		monitoringChartFactory.getPost($scope.patient.id).save($scope.post);
        };

    }])
;