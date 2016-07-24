'use strict';
angular.module('App')
.controller('IssueStockController',['$scope','authorize','inventoryFactory', function($scope,authorize,inventoryFactory){
	
	
	$scope.showAlert=false;
		$scope.issueStockItems=[];
		$scope.addingItem = false;
		// $scope.issueStockItem = {
		// 	ID:null,
		// 	itemName:null,
		// 	usageType:null,
		// 	brandName:null,
		// 	quantityRequired:null,
		// 	quantityType:null,
		// 	saved:false
		// };
		
		$scope.issueStock = {
			stockIssuedTo:null,
			estimatedSingleUse:null,
			estimatedReUse:null,
			estimatedNewDialyser:null,
			estimatedCatehterizationDoubleLumen:null,
			estimatedCatehterizationSingleumen:null,
			stockIssueDate:new Date(),
			stockTakerName:null,
			nextExpectedStockIssueDate:new Date(),
			lastModifiedBy:null
		};
		
		$scope.updateFilteredItems = function(){
			inventoryFactory.getStocks(authorize.getCentre()).query().$promise.then(function(response){
				$scope.filteredItems = response;
				console.log(response);
				for(var i=0;i<$scope.filteredItems.length;i++)
					$scope.filteredItems[i].quantity=0;
			},function(response){
				alert('failed to retrieve stocks');
			})
		}
		$scope.updateFilteredItems();
		$scope.addStockItem = function(obj){
			console.log(obj);
			$scope.issueStockItem=obj;
			$scope.showAlert=false;
		    $scope.issueStockItem.lastModifiedBy = authorize.getUsername();
			$scope.issueStockItems.push($scope.issueStockItem);
			$scope.updateFilteredItems();
			$scope.addingItem=false;
			
		}
		
		$scope.removeItem = function(index){
			console.log('deleting iindex'+index);
            $scope.issueStockItems.splice(index,1);
		};

		$scope.doIssueStock = function(){
			console.log($scope.issueStock);
			$scope.issueStock.centreId=authorize.getCentre();
			$scope.issueStock.lastModifiedBy=authorize.getUsername();
			console.log($scope.issueStock);
			inventoryFactory.getStocksIssued(authorize.getCentre()).save($scope.issueStock).$promise.then(function(response){
					console.log('stockIssuedId id is '+response.stockIssuedId);
					$scope.stockIssuedId=response.stockIssuedId;
					console.log($scope.issueStockItems);
				//	console.log('here. length is '+$scope.indentItems.length);
					for(var i = 0; i <  $scope.issueStockItems.length;  i++){			
						$scope.issueStockItems[i].stockIssuedId=$scope.stockIssuedId;
						inventoryFactory.getStockIssuedItems(authorize.getCentre(),$scope.stockIssuedId).save($scope.issueStockItems[i]).$promise.then(function(response){
						},function(response){
							$scope.messageColor = 'danger';
							$scope.showAlert = true;
							$scope.message = ' partial save failed';
							return;
						});	
					}
					inventoryFactory.getStocks(authorize.getCentre()).query().$promise.then(function(response){
						$scope.stocks= response;
						for(var i=0;i<$scope.issueStockItems.length;i++){
							for(var j=0;j<$scope.stocks.length;j++)
							{
								if($scope.stocks[j].itemId == $scope.issueStockItems[i].itemId)
								{
									$scope.stocks[j].availableQuantity-=$scope.issueStockItems[i].quantity;
									inventoryFactory.getStocks(authorize.getCentre()).update({centreId:$scope.stocks[j].centreId, itemId: $scope.stocks[j].itemId},$scope.stocks[j]);
								}
							}
						}


					$scope.issueStockForm.$setPristine();
					$scope.savedOnce = true;
					$scope.message = 'Issued successfully!';
					$scope.messageColor = 'success';
					$scope.showAlert = true;
					$scope.issueStock = {
						stockIssuedTo:null,
						estimatedSingleUse:null,
						estimatedReUse:null,
						estimatedNewDialyser:null,
						estimatedCatehterizationDoubleLumen:null,
						estimatedCatehterizationSingleumen:null,
						stockIssueDate:new Date(),
						stockTakerName:null,
						nextExpectedStockIssueDate:new Date(),
						lastModifiedBy:null
					};

				},function(response){alert('failed to update stocks')});
				
			},function(response){
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
				$scope.message = 'Saving failed';
			});
		}
		
		
	
	}])
;