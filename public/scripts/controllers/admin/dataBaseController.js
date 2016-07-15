'use strict';

angular.module('App')
.controller('DataBaseController',['$scope','authorize','backendFactory', function ($scope, authorize,backendFactory) {

	$scope.panel={};
	$scope.dialyzateType={};
	$scope.transactionType={};
	$scope.dialysisType={};
	$scope.consumableType={};
	$scope.procedureType={};
	$scope.pharmacyType={};
	$scope.shouldShowForm = false;
	$scope.displayList = function(){
		console.log($scope.table);
		if($scope.table == 'Panels' )
			$scope.showPanels();
		if($scope.table == 'DialyzateTypes')
			$scope.showDialyzateTypes();
		if($scope.table == 'TransactionTypes')
			$scope.showTransactionTypes();
		if($scope.table == 'DialysisTypes')
			$scope.showDialysisTypes();
		if($scope.table == 'ConsumableTypes')
			$scope.showConsumableTypes();
		if($scope.table == 'ProcedureTypes')
			$scope.showProcedureTypes();
		if($scope.table == 'PharmacyTypes')
			$scope.showPharmacyTypes();
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


	$scope.addDialysisType = function(){
		console.log($scope.dialysisType);
		backendFactory.getDialysisTypes().save($scope.dialysisType).$promise.then(function(response){
						alert('DialysisType saved');
						$scope.showDialysisTypes();
						$scope.showForm=false;
				},function(response){
					alert('dialysisType save failed!');
				});
	};

	$scope.showDialysisTypes = function(){
		console.log('showing dialysisType');
		backendFactory.getDialysisTypes().query().$promise.then(function(response){
					$scope.dialysisTypes=response;
				},function(response){
					alert('dialysisTypes retrieval failed!');
				});
	};

	$scope.deleteDialysisType = function(dialysisType){
		backendFactory.getDialysisTypes().delete({dialysisType:dialysisType});
		$scope.showDialysisTypes();
	}


	$scope.addConsumableType = function(){
		console.log($scope.consumableType);
		backendFactory.getConsumableTypes().save($scope.consumableType).$promise.then(function(response){
						alert('ConsumableType saved');
						$scope.showConsumableTypes();
						$scope.showForm=false;
				},function(response){
					alert('consumableType save failed!');
				});
	};

	$scope.showConsumableTypes = function(){
		console.log('showing consumableType');
		backendFactory.getConsumableTypes().query().$promise.then(function(response){
					$scope.consumableTypes=response;
				},function(response){
					alert('consumableTypes retrieval failed!');
				});
	};

	$scope.deleteConsumableType = function(consumableType){
		backendFactory.getConsumableTypes().delete({consumableType:consumableType});
		$scope.showConsumableTypes();
	}


	$scope.addProcedureType = function(){
		console.log($scope.procedureType);
		backendFactory.getProcedureTypes().save($scope.procedureType).$promise.then(function(response){
						alert('ProcedureType saved');
						$scope.showProcedureTypes();
						$scope.showForm=false;
				},function(response){
					alert('procedureType save failed!');
				});
	};

	$scope.showProcedureTypes = function(){
		console.log('showing procedureType');
		backendFactory.getProcedureTypes().query().$promise.then(function(response){
					$scope.procedureTypes=response;
				},function(response){
					alert('procedureTypes retrieval failed!');
				});
	};

	$scope.deleteProcedureType = function(procedureType){
		backendFactory.getProcedureTypes().delete({procedureType:procedureType});
		$scope.showProcedureTypes();
	}

	$scope.addPharmacyType = function(){
		console.log($scope.pharmacyType);
		backendFactory.getPharmacyTypes().save($scope.pharmacyType).$promise.then(function(response){
						alert('PharmacyType saved');
						$scope.showPharmacyTypes();
						$scope.showForm=false;
				},function(response){
					alert('pharmacyType save failed!');
				});
	};

	$scope.showPharmacyTypes = function(){
		console.log('showing pharmacyType');
		backendFactory.getPharmacyTypes().query().$promise.then(function(response){
					$scope.pharmacyTypes=response;
				},function(response){
					alert('pharmacyTypes retrieval failed!');
				});
	};

	$scope.deletePharmacyType = function(pharmacyType){
		backendFactory.getPharmacyTypes().delete({pharmacyType:pharmacyType});
		$scope.showPharmacyTypes();
	}

}]);
