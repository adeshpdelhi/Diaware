
'use strict';
angular.module('App')
.controller('MonitoringPostController',['$scope','patientFactory','choosePatientFactory','authorize','monitoringChartFactory', function($scope, patientFactory, choosePatientFactory, authorize,monitoringChartFactory){
        if(!$scope.view || !$scope.post){
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
            	lastModifiedBy:null,
                new:true
            };
        }
		$scope.showalert_postdialysis=false;
        
        $scope.$watch('post.postWeight',function(newVal, oldVal){
        	$scope.post.weightLoss = ($scope.view?$scope.patientChart.monitoringChartPreAssessment.preHDWeight:$scope.preHDWeight) - $scope.post.postWeight;
        })
        $scope.savePost = function(){
        	$scope.post.patientId = $scope.patient.id;
        	$scope.post.postId = $scope.basic.preBasicId;
    		$scope.post.lastModifiedBy = authorize.getUsername();
    		console.log($scope.post);
    		// console.log($scope.patient.id);
    		monitoringChartFactory.getPost($scope.basic.patientId).save($scope.post).$promise.then(function(response){
    				$scope.showalert_postdialysis=true;	
                    $scope.message="Saved Successfully!";
                    $scope.messageColor='success';		
    			},
    			function(response){
    				$scope.showalert_postdialysis=false;
    				console.log(response);
                    $scope.message="Error: " +response.status + " "+ response.statusText + "!";
                    $scope.messageColor = 'danger';
    			});
			
        };

        $scope.updatePost = function(){
            $scope.updatedPost = true;
            $scope.post.lastModifiedBy = authorize.getUsername();

            if(!$scope.post.new) {
                monitoringChartFactory.getPost($scope.patientChart.patientId).update({
                    postId:$scope.post.postId
                },$scope.post)
                .$promise.then(function(response){
                    console.log(response);
                    $scope.updateParentValues(false,true,"Updated Successfully!",6);
                },function(response){
                    $scope.updateParentValues(false,true,"Error: "+response.status + " " +response.statusText + "!",6);
                });
            }else{
                $scope.post.patientId = $scope.patientChart.patientId;
                $scope.post.postId = $scope.patientChart.preBasicId;
                $scope.post.lastModifiedBy = authorize.getUsername();
                console.log($scope.post);
                // console.log($scope.patient.id);
                monitoringChartFactory.getPost($scope.patientChart.patientId).save($scope.post)
                .$promise.then(function(response){
                        console.log(response);
                        $scope.updateParentValues(false,true,"Updated Successfully!",6);
                    },
                    function(response){
                        $scope.updateParentValues(false,true,"Error: "+response.status + " " +response.statusText + "!",6);

                    });    
            }
        };

    }])
;