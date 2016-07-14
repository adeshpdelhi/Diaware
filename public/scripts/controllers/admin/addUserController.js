'use strict';

angular.module('App')
.controller('AddUserController',['$scope','authorize', function ($scope, authorize) {

	$scope.newuser={admin:false,manager:false,incharge:false, clinical:false};
	$scope.addUser = function(){
		console.log($scope.newuser);
		authorize.getUsers().save($scope.newuser).$promise.then(function(response){
			
		});
	};
}]);
