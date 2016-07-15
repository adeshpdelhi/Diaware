'use strict';

angular.module('App')
.controller('DataBaseController',['$scope','authorize','backendFactory', function ($scope, authorize,backendFactory) {

	$scope.panel={};
	$scope.dialyzateType={};
	$scope.transactionType={};
	$scope.shouldShowForm = false;
	$scope.displayList = function(){
		console.log($scope.table);
		if($scope.table == 'Panels' )
			$scope.showPanels();
		if($scope.table == 'DialyzateTypes')
			$scope.showDialyzateTypes();
		if($scope.table == 'TransactionTypes')
			$scope.showTransactionTypes();
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

	$scope.deleteDialyzateType = function(dialyzateType){
		backendFactory.getDialyzateTypes().delete({dialyzateType:dialyzateType});
		$scope.showDialyzateTypes();
	}

	


	$scope.addTransactionType = function(){
		console.log($scope.transactionType);
		backendFactory.getTransactionTypes().save($scope.transactionType).$promise.then(function(response){
						alert('TransactionType saved');
						$scope.showTransactionTypes();
						$scope.showForm=false;
				},function(response){
					alert('transactionType save failed!');
				});
	};

	$scope.showTransactionTypes = function(){
		console.log('showing transactionType');
		backendFactory.getTransactionTypes().query().$promise.then(function(response){
					$scope.transactionTypes=response;
				},function(response){
					alert('transactionTypes retrieval failed!');
				});
	};

	$scope.deleteTransactionType = function(transactionType){
		backendFactory.getTransactionTypes().delete({transactionType:transactionType});
		$scope.showTransactionTypes();
	}

}]);
