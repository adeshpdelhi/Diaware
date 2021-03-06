'use strict';
angular.module('App')
.controller('StockReceivedController',['$scope','authorize', function($scope,authorize){
	
	$scope.showForm=false;
	$scope.addItemActivated=true;
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
		
		
		$scope.addItemInStockReceived = function(){
			$scope.showForm=true;
			$scope.addItemActivated=false;
		}
		
		$scope.addStockReceivedItem = function(){
			$scope.showalert_stock_received=false;
			
			if($scope.stockReceivedItem.itemName!==null)
			{
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
			$scope.addItemActivated=true;
			$scope.showForm=false;
			}
		}
		
		$scope.saveStockReceived = function(){
			
		}
		
		
	
	}])
;