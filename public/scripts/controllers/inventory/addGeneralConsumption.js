'use strict';
angular.module('App')
.controller('AddGeneralConsumptionController',['$scope','authorize','inventoryFactory','regularForm', function($scope,authorize,inventoryFactory, regularForm){

		$scope.regularForm = regularForm.regularForm;
		$scope.showAlert=false;

		inventoryFactory.
		
}])
