'use strict';

angular.module('App')
.controller('AddUserController',['$scope','authorize', function ($scope, authorize) {
	$scope.showalert_add_user=false;
	$scope.activeUser = authorize.getActiveUser();
	$scope.newuser={username: null, password: null, centre:'', centres:'', admin:false,manager:false,incharge:false, clinical:false};
	var tempcentres = authorize.getActiveUser().centres;
	$scope.channels=[];
	for(var i = 0; i<tempcentres.length; i++ ){
	    $scope.channels.push({value: tempcentres[i], label: tempcentres[i]});
	}
	$scope.addUser = function(){
			$scope.showalert_add_user=false;
		console.log($scope.newuser);
		var tempcentres = authorize.getActiveUser().centres;
		if(!($scope.newuser.centres.constructor === Array))
    		$scope.newuser.centres = $scope.newuser.centres.split(',');
		var newcentres =$scope.newuser.centres;
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

		$scope.showalert_add_user=true;
			$scope.addUserForm.$setPristine();
			$scope.newuser={username: null, password: null, centre:'', centres:'', admin:false,manager:false,incharge:false, clinical:false};

		
			if(response!=null)
				alert('Added');
			else
				alert('Failed');

		});
	};
	$scope.centrechanged = function(){
		console.log('change detected: contained? '+$scope.newuser.centres.includes($scope.newuser.centre)+ ' '+$scope.newuser.centres+' '+$scope.newuser.centre);
		if(!($scope.newuser.centres.constructor === Array))
    		$scope.newuser.centres = $scope.newuser.centres.split(',');
		var flag= false;
		for(var i=0; i<$scope.newuser.centres.length; i++){
			if($scope.newuser.centre == $scope.newuser.centres[i])
				flag = true;
		}
		if(flag == false){
			if($scope.newuser.centres!='')
				$scope.newuser.centres= $scope.newuser.centres+','+$scope.newuser.centre;
			else
				$scope.newuser.centres=$scope.newuser.centre;
			console.log('added '+$scope.newuser.centre);
		}
	}
}]);
