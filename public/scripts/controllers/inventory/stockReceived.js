'use strict';
angular.module('App')
.controller('StockReceivedController',['$scope','authorize', function($scope,authorize){
	
	
	$scope.showalert_stock_received=false;
		$scope.stockReceivedItems=[];
		$scope.stockReceivedItem = {
			ID:null,
			itemName:null,
			usageType:null,
			brandName:null,
			quantityRequired:null,
			quantityType:null,
			vendorName:null,
			saved:false
		};
		
		$scope.stockReceived = {
			ID:null,
			indentRequestNo:null,
			indentRequestDate:null,
			saved:false
		};
		
		var cnt = 0;
		$scope.addStockReceivedItem = function(){
			$scope.showalert_stock_received=false;
			//$scope.item.ID = cnt++;
			//$scope.event.patientId = $scope.newpatient_basic.id;
			//$scope.item.lastModifiedBy = $scope.newpatient_basic.lastModifiedBy;
			$scope.stockReceivedItems.push($scope.stockReceivedItem);
			console.log($scope.stockReceivedItem);
			//$scope.item.saved:true;
			$scope.stockReceivedForm.$setPristine();
			
			$scope.stockReceivedItem = {
			ID:null,
			itemName:null,
			usageType:null,
			brandName:null,
			quantityRequired:null,
			quantityType:null,
			vendorName:null,
			saved:false
		};
		}
		
		$scope.saveStockReceived = function(){
			
		}
		
		
	
	}])
;