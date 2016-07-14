'use strict';

angular.module('App')
.controller('ViewUserController',['$scope','staffFactory','authorize','$uibModal',function ($scope, staffFactory, authorize, $uibModal) {
	$scope.centres={};
	$scope.getStaff = function(){
		staffFactory.getCentreStaff().getFiltered({centreId:$scope.centres}).$promise.then(function(response){
	      $scope.users= response;
	      console.log(response);
	    });
	};
	$scope.editStaff = function(username){
		var user={};
		authorize.getUsers().get({username:username}).$promise.then(function(response){
			user= response;
	        var modalInstance = $uibModal.open({
	          templateUrl: 'views/admin/editStaffModal.html',
	          controller: 'EditStaffModalController',
	          size:'lg' ,
	          resolve: {
	            user: function () {
	             return user;
	            }
	          }
	        });
		});
	}
}])

.controller('EditStaffModalController', ['$scope', '$state', 'authorize', '$uibModalInstance', 'user', function ($scope, $state, authorize, $uibModalInstance, user) {

    $scope.user = user;
    var tempcentres = authorize.getActiveUser().centres;
	$scope.channels=[];
	for(var i = 0; i<tempcentres.length; i++ ){
	    $scope.channels.push({value: tempcentres[i], label: tempcentres[i]});
	}
    $scope.updateStaff = function(){
    	var tempcentres = authorize.getActiveUser().centres;
		var newcentres =$scope.user.centres.split(',');
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
        authorize.getUsers().update({username:user.username},$scope.user);
        $uibModalInstance.close();
    };

	$scope.centrechanged = function(){
		console.log('change detected: contained? '+$scope.user.centres.includes($scope.user.centre)+ ' '+$scope.user.centres+' '+$scope.user.centre);
		if($scope.user.centres.includes($scope.user.centre) == false){
			if($scope.user.centres.length!=0)
				$scope.user.centres= $scope.user.centres+','+$scope.user.centre;
			else
				$scope.user.centres=$scope.user.centre;
			console.log('added '+$scope.user.centre);
		}
	}
}]);