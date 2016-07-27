'use strict';

angular.module('App')
.controller('AddUserController',['$scope','authorize','$timeout', function ($scope, authorize,$timeout) {
	$scope.showalert_add_user=false;
	$scope.activeUser = authorize.getActiveUser();
	$scope.newuser={username: null, password: null, centre:'', centres:'', admin:false,manager:false,incharge:false, clinical:false};
	$scope.channels=[];
	$timeout(function(){
		$scope.tempcentres = authorize.getActiveUser().centres;
		for(var i = 0; i<$scope.tempcentres.length; i++ ){
			if($scope.tempcentres[i]!='all')
			    $scope.channels.push({value: $scope.tempcentres[i], label: $scope.tempcentres[i]});
		}
	},1000);

	$scope.addUser = function(){
			$scope.showalert_add_user=false;
		console.log($scope.newuser);
		var tempcentres = authorize.getActiveUser().centres;
		if(!($scope.newuser.centres.constructor === Array))
    		$scope.newuser.centres = $scope.newuser.centres.split(',');
		var newcentres =$scope.newuser.centres;
		if(newcentres.length==0){
			$scope.showalert_add_user=true;
			$scope.message = 'User cannot be added. Recheck centres';
			$scope.messageColor='danger';
			return;
		}
		for(var i=0; i<newcentres.length; i++){
			var flag=false;
			for(var j = 0; j<tempcentres.length; j++ ){
			    if(tempcentres[j]==newcentres[i])
			    	flag=true;
			}
			if(flag==false)
				{
					$scope.showalert_add_user=true;
					$scope.message = 'One of the centres invalid';
					$scope.messageColor='danger';
					return;
				}
		}
		console.log('adding');
		authorize.getUsers().save($scope.newuser).$promise.then(function(response){

			$scope.showalert_add_user=true;
			$scope.message='User added successfully';
			$scope.messageColor = 'success';
			$scope.addUserForm.$setPristine();
			$scope.newuser={username: null, password: null, centre:'', centres:'', admin:false,manager:false,incharge:false, clinical:false};

		
			if(response!=null)
				{
					$scope.showalert_add_user=true;
					$scope.message='User added successfully';
					$scope.messageColor = 'success';
				}
			else
				{
					$scope.showalert_add_user=true;
					$scope.message='Failed to add user!';
					$scope.messageColor = 'danger';
				}

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
