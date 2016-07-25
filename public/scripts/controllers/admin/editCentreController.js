'use strict';

angular.module('App')
.controller('EditCentreController',['$scope','backendFactory','authorize','$state','$timeout', function($scope,backendFactory,authorize,$state,$timeout){
	var user = authorize.getActiveUser();

	var execute = function(){
		$scope.choseCentre = false;
		$scope.centreId = null;
		$scope.submitCentre = false;
		$scope.noCentresInDB = false;
		$scope.editCentre = false;
		backendFactory.getCentres().query(function(response){
			$scope.centres = response;
		})
		if(user != null && user.admin){
			$scope.showPage = true;

			$scope.centres=user.centres;

			$scope.display_centre=true;
			if($scope.centres.length == 0){
			    $scope.noCentresInDB = true;
			    $scope.submitCentre = false;
			}

		} 
		$scope.view = true;
	};
	if(user.admin == null){
		console.log(user);
		$timeout(function(){
			user = authorize.getActiveUser();
			execute();
		},1000);
	}
	else execute();
	$scope.getValue = function(str,index,machine){
		console.log(str+$scope.centre.typesOfMachinesAvailable[index] + 'jdjskfjdhkfjdhfkjsdhflkj' + "   " + index +"        "+ machine);
		return $scope.centre[str+$scope.centre.typesOfMachinesAvailable[index]];
	};
	$scope.redirectAddCentre = function(){
		$state.go('app.admin.addcentre');
	};
	$scope.chooseCentre = function(){
		backendFactory.getCentres().get({id:$scope.centreId}).$promise.then(function(response){
			$scope.centre = response;
			$scope.choseCentre = true;
			console.log($scope.centre);
		});
	};
	$scope.edit = function(){
		$scope.addCentre = $scope.centre;
		$scope.editCentre = true;
	};
	
	$scope.updateValuesFromChild = function(editCentre, alert,message,color){
		$scope.editCentre = editCentre;
		$scope.updatedCentre = alert;
		$scope.message = message;
		$scope.messageColor = color;
	};

}]);
