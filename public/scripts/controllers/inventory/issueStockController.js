'use strict';
angular.module('App')
.controller('IssueStockController',['$scope','authorize', function($scope,authorize){
	
	
	$scope.showalert_issue_stock=false;
		$scope.issueStockItems=[];
		$scope.issueStockItem = {
			ID:null,
			itemName:null,
			usageType:null,
			brandName:null,
			quantityRequired:null,
			quantityType:null,
			saved:false
		};
		
		$scope.issueStock = {
			ID:null,
			stockIssuedTo:null,
			estimatedSingleUse:null,
			estimatedReUse:null,
			estimatedNewDialyser:null,
			stockIssueDate:null,
			stockTakerName:null,
			nextIssueDate:null,
			saved:false
		};
		
		var cnt = 0;
		$scope.addStockItem = function(){
			$scope.showalert_issue_stock=false;
			//$scope.item.ID = cnt++;
			//$scope.event.patientId = $scope.newpatient_basic.id;
			//$scope.item.lastModifiedBy = $scope.newpatient_basic.lastModifiedBy;
			$scope.issueStockItems.push($scope.issueStockItem);
			console.log($scope.issueStockItem);
			//$scope.item.saved:true;
			$scope.issueStockForm.$setPristine();
			
			$scope.issueStockItem = {
				ID:null,
				itemName:null,
				usageType:null,
				brandName:null,
				quantityRequired:null,
				quantityType:null,
				saved:false
		};
		}
		
		$scope.issueStock = function(){
			
		}
		
		
	
	}])
;