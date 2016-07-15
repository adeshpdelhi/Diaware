'use strict';

angular.module('App')
.controller('DataBaseController',['$scope','authorize','backendFactory', function ($scope, authorize,backendFactory) {

	$scope.panel={};
	$scope.dialyzateType={};
	$scope.shouldShowForm = false;
	$scope.displayList = function(){
		console.log($scope.table);
		if($scope.table == 'Panels' )
			$scope.showPanels();
		if($scope.table == 'DialyzateTypes')
			$scope.showDialyzateTypes();
	};
	$scope.addPanel = function(){
		console.log($scope.panel);
		backendFactory.getPanels().save($scope.panel).$promise.then(function(response){
						alert('Panel saved');
						backendFactory.getPanels().query().$promise.then(function(response){
							$scope.panels=response;
							$scope.showForm=false;
						},function(response){
							alert('Panels retrieval failed!');
						});
				},function(response){
					alert('Panel save failed!');
				});
	};
	$scope.preparePanelPopover = function(panelId){
		backendFactory.getPanels().get({panelId:panelId}).$promise.then(function(response){
					$scope.panelPopover.panel=response;
					
				},function(response){
					alert('Panel retrieval failed!');
				});
	}
	$scope.updatePanel = function(){
		// $scope.panel=$scope.panelPopover.panel;
		console.log($scope.panelPopover.panel);
		backendFactory.getPanels().update({panelId:$scope.panelPopover.panel.id},$scope.panelPopover.panel);
		backendFactory.getPanels().query().$promise.then(function(response){
					$scope.panels=response;
				},function(response){
					alert('Panels retrieval failed!');
				});
	}
	$scope.panelPopover = {
	    templateUrl: 'panelPopoverTemplate.html',
	    title: 'Edit Panel Details'
	  };
	$scope.showPanels = function(){
		console.log('showing panels');
		backendFactory.getPanels().query().$promise.then(function(response){
					$scope.panels=response;
				},function(response){
					alert('Panels retrieval failed!');
				});
	};


	$scope.addDialyzateType = function(){
		console.log($scope.dialyzateType);
		backendFactory.getDialyzateTypes().save($scope.dialyzateType).$promise.then(function(response){
						alert('DialyzateType saved');
						$scope.showDialyzateTypes();
						$scope.showForm=false;
				},function(response){
					alert('dialyzateType save failed!');
				});
	};

	$scope.showDialyzateTypes = function(){
		console.log('showing dialyzateType');
		backendFactory.getDialyzateTypes().query().$promise.then(function(response){
					$scope.dialyzateTypes=response;
				},function(response){
					alert('dialyzateTypes retrieval failed!');
				});
	};

	$scope.updateDialyzateTypeList = function(){

	}
	$scope.deleteDialyzateType = function(dialyzateType){
		backendFactory.getDialyzateTypes().delete({dialyzateType:dialyzateType});
		$scope.showDialyzateTypes();
	}
}]);
