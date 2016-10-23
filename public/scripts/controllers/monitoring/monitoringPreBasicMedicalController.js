'use strict';
angular.module('App')
.controller('MonitoringPreBasicMedicalController' ,['$scope','authorize','backendFactory','monitoringChartFactory', function($scope,authorize,backendFactory,monitoringChartFactory){
	if(!$scope.view || ($scope.patientChart != null  && $scope.basicMedical == null)){
		$scope.basicMedical ={
			preBasicId: null,
			dialyzerName: null,
			dialyzerType: null,
			accessUsed: null,
			centralLineCreated: null,
			centralLine: null,
			anticoagulant: null,
			bolusAmount: null,
			hourlyHeparin:null,
			heparinStopBefore: null,
			NSFlushingFrequency: null,
			NSFlushingVolume: null,
			lastModifiedBy: null,
			new:true
		};
		$scope.showCentralLine = false;
	}
	///////////////////////////////////////////////////////////////////////////
	$scope.showBolus=true;
	$scope.showHourlyHeparin=true;
	$scope.$watch('basicMedical.anticoagulant',function(newVal,oldVal){
				console.log('second--- ');

				console.log($scope.basicMedical.anticoagulant);
				if(newVal){
					if($scope.basicMedical.anticoagulant=="Yes")
					{
						$scope.showBolus=false;
						$scope.showHourlyHeparin=false;
					}
					else if($scope.basicMedical.anticoagulant=="No")
					{
						$scope.showBolus=true;
						$scope.showHourlyHeparin=true;
					} 
				}
	});
	//////////////////////////////////////////////////////////////////////////////
	$scope.showalert_predialysis_basic_medical=false;
	backendFactory.getCentres().get({id:authorize.getCentre()}).$promise.then(function(response){
		$scope.accessLinesAvailable = response.accessLinesAvailable;
	})
	$scope.savedOnce=false;
	$scope.saveBasicMedical = function(){
		$scope.basicMedical.patientId = $scope.basic.patientId;
		$scope.basicMedical.preBasicId = $scope.basic.preBasicId;
		$scope.basicMedical.lastModifiedBy = authorize.getUsername();
		console.log($scope.basicMedical);
		monitoringChartFactory.getPreBasicMedicals($scope.basic.patientId).save($scope.basicMedical).$promise.then(function(response){
			$scope.showalert_predialysis_basic_medical=true;
			$scope.message="Successfully Saved Details";
			$scope.messageColor="success";
			console.log('old value of savedOnce in basicMedical '+$scope.savedOnce);
			$scope.savedOnce=true;
			},function(response){
				$scope.showalert_predialysis_basic_medical=true;
				$scope.message="Error: "+ response.status + " " + response.statusText + "!";
				$scope.messageColor="danger";
				console.log(response);
			});
		//$scope.showalert_predialysis_basic_medical=true;
	};
	$scope.updatePreBasicMedical = function(){
		$scope.updatedPreBasicMedical = true;
		$scope.basicMedical.lastModifiedBy = authorize.getUsername();
		if(!$scope.basicMedical.new){
			monitoringChartFactory.getPreBasicMedicals($scope.patientChart.patientId).update({
				preBasicId:$scope.basicMedical.preBasicId
			},$scope.basicMedical)
			.$promise.then(function(response){
				console.log(response);
				$scope.updateParentValues(false,true,"Updated Successfully!",2,'success');
			},function(response){
				$scope.updateParentValues(false,true,"Error: "+ response.status + " " + response.statusText +"!",2);
			});
		}else{
			$scope.basicMedical.patientId = $scope.patientChart.patientId;
			$scope.basicMedical.preBasicId = $scope.patientChart.preBasicId;
			console.log($scope.basicMedical);
			monitoringChartFactory.getPreBasicMedicals($scope.patientChart.patientId).save($scope.basicMedical).$promise.then(function(response){
				$scope.updateParentValues(false,true,"Updated Successfully!",2,'danger');
				
			},function(response){
				$scope.updateParentValues(false,true,"Error: "+ response.status + " " + response.statusText +"!",2);

			});
		}
	};
}])
;