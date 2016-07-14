'use strict';

angular.module('App')
.controller('AddUserController',['$scope','authorize', function ($scope, authorize) {

	$scope.newuser={centre:'', centres:'', admin:false,manager:false,incharge:false, clinical:false};
	var tempcentres = authorize.getActiveUser().centres;
	$scope.channels=[];
	for(var i = 0; i<tempcentres.length; i++ ){
	    $scope.channels.push({value: tempcentres[i], label: tempcentres[i]});
	}
	$scope.addUser = function(){
		console.log($scope.newuser);
		var tempcentres = authorize.getActiveUser().centres;
		var newcentres =$scope.newuser.centres.split(',');
		for(var i=0; i<newcentres.length; i++){
			var flag=false;
			for(var j = 0; j<tempcentres.length; j++ ){
			    if(tempcentres[j]==newcentres[i])
			    	flag=true;
			}
			if(flag==false)
				{
					alert('one of the centre invalid');
					return;
				}
		}
		console.log('adding');
		authorize.getUsers().save($scope.newuser).$promise.then(function(response){
		});
	};
	$scope.centrechanged = function(){
		console.log('change detected: contained? '+$scope.newuser.centres.includes($scope.newuser.centre)+ ' '+$scope.newuser.centres+' '+$scope.newuser.centre);
		if($scope.newuser.centres.includes($scope.newuser.centre) == false){
			if($scope.newuser.centres.length!=0)
				$scope.newuser.centres= $scope.newuser.centres+','+$scope.newuser.centre;
			else
				$scope.newuser.centres=$scope.newuser.centre;
			console.log('added '+$scope.newuser.centre);
		}
	}
}]);
