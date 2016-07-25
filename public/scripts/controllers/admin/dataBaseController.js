'use strict';

angular.module('App')
.controller('DataBaseController',['$scope','authorize','backendFactory', function ($scope, authorize,backendFactory) {

	$scope.panel={};
	$scope.dialyzateType={};
	$scope.transactionType={};
	$scope.ledger={};
	$scope.disease ={};
	$scope.catheterizationItem ={};
	$scope.dialysisItem  ={};

	$scope.shouldShowForm = false;
	$scope.displayList = function(){
		console.log($scope.table);
		if($scope.table == 'Panels' )
			$scope.showPanels();
		if($scope.table == 'DialyzateTypes')
			$scope.showDialyzateTypes();
		if($scope.table == 'TransactionTypes')
			$scope.showTransactionTypes();
		if($scope.table == 'LedgerTable')
			$scope.showLedgerTable();
		if($scope.table == 'Diseases')
			$scope.showDiseases();
		if($scope.table == 'CatheterizationItems')
			$scope.showCatheterizationItems();
		if($scope.table == 'DialysisItems')
			$scope.showDialysisItems();
	};
	$scope.addPanel = function(){
		console.log($scope.panel);
		backendFactory.getPanels().save($scope.panel)
		.$promise.then(function(response){
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
	// $scope.preparePanelPopover = function(panelId){
	// 	backendFactory.getPanels().get({
	// 		panelId:panelId
	// 	}).$promise.then(function(response){
	// 		$scope.panelPopover.panel=response;
			
	// 	},function(response){
	// 		alert('Panel retrieval failed!');
	// 	});
	// }
	$scope.updatePanel = function(panel){
		// $scope.panel=$scope.panelPopover.panel;
		console.log(panel);
		backendFactory.getPanels().update({panelId:panel.id},panel);
		backendFactory.getPanels().query().$promise.then(function(response){
			$scope.panels=response;
			$scope.editPanel = false;
		},function(response){
			alert('Panels retrieval failed!');
			$scope.editPanel = false;
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
	};

	$scope.addDisease = function(){
		console.log($scope.disease);
		backendFactory.getDiseases().save($scope.disease).$promise.then(function(response){
				alert('disease saved');
				$scope.showDiseases();
				$scope.showForm=false;
		},function(response){
			alert('disease save failed!');
		});
	};

	$scope.showDiseases = function(){
		console.log('showing diseases');
		backendFactory.getDiseases().query().$promise.then(function(response){
			$scope.diseases=response;
		},function(response){
			alert('diseases retrieval failed!');
		});
	};

	$scope.deleteDisease = function(diseaseName){
		backendFactory.getDiseases().delete({diseaseName:diseaseName});
		$scope.showDiseases();
	};




	$scope.addCatheterizationItem = function(){
		console.log($scope.catheterizationItem);
		backendFactory.getCatheterizationItems().save($scope.catheterizationItem).$promise.then(function(response){
				alert('catheterizationItem saved');
				$scope.showCatheterizationItems();
				$scope.showForm=false;
		},function(response){
			alert('catheterizationItem save failed!');
		});
	};

	$scope.showCatheterizationItems = function(){
		console.log('showing catheterizationItems');
		backendFactory.getCatheterizationItems().query().$promise.then(function(response){
			$scope.catheterizationItems=response;
		},function(response){
			alert('catheterizationItems retrieval failed!');
		});
	};

	$scope.deleteCatheterizationItem = function(itemId){
		backendFactory.getCatheterizationItems().delete({itemId:itemId});
		$scope.showCatheterizationItems();
	};




	$scope.addDialysisItem = function(){
		console.log($scope.dialysisItem);
		backendFactory.getDialysisItems().save($scope.dialysisItem).$promise.then(function(response){
				alert('dialysisitem saved');
				$scope.showDialysisItems();
				$scope.showForm=false;
		},function(response){
			alert('dialysisItem save failed!');
		});
	};

	$scope.showDialysisItems = function(){
		console.log('showing diseases');
		backendFactory.getDialysisItems().query().$promise.then(function(response){
			$scope.dialysisItems = response;
		},function(response){
			alert('dialysisitems retrieval failed!');
		});
	};

	$scope.deleteDialysisItem = function(itemId){
		backendFactory.getDialysisItems().delete({itemId:itemId});
		$scope.showDialysisItems();
	};



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
	};

	$scope.addLedger = function(){
		console.log($scope.ledger);
		backendFactory.getLedgers().save($scope.ledger).$promise.then(function(response){
						$scope.showLedgerTable();
						$scope.showForm=false;
						$scope.alertLedger = true;
						$scope.message ="Saved Successfully!";
						$scope.messageColor = 'success';
				},function(response){
					// alert('ledger save failed!');
					$scope.alertLedger = true;
					$scope.message ="Save Failed!";
					$scope.messageColor = 'danger';
				});
	};

	$scope.showLedgerTable = function(){
		console.log('showing LedgerTable');
		backendFactory.getLedgers().query(function(response){
					$scope.ledgers=response;
				},function(response){
					$scope.alertLedger = true;
					$scope.message ="Retrieval Failed!";
					$scope.messageColor = 'danger';
				});
	};

	$scope.removeLedger = function(ledger){
		console.log(ledger);
		backendFactory.getLedgers().delete({ledgerType:ledger.ledgerType,id:ledger.id}).$promise.then(function(response){
			$scope.showLedgerTable();
			$scope.showForm=false;
			$scope.alertLedger = true;
			$scope.message ="Deleted Successfully!";
			$scope.messageColor = 'success';
		},function (response) {
			$scope.alertLedger = true;
			$scope.message ="Deletion Failed!";
			$scope.messageColor = 'danger';
		});
	};
	$scope.updateLedger = function (ledger) {
		console.log(ledger);
		backendFactory.getLedgers().update({ledgerType:ledger.ledgerType,id:ledger.id},ledger).$promise.then(function (response) {
			$scope.showLedgerTable();
			$scope.showForm=false;
			$scope.alertLedger = true;
			$scope.message ="Updated Successfully!";
			$scope.messageColor = 'success';
			$scope.edit = false;
		},function (response) {
			$scope.alertLedger = true;
			$scope.message ="Updation Failed!";
			$scope.messageColor = 'danger';
		})
	};
}]);
