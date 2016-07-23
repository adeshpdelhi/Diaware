'use strict';
angular.module('App')
.controller('ClinicalEventController',['$scope','patientFactory', 'authorize', function($scope,patientFactory,authorize){
		$scope.savedOnce = false;
		/////////
		$scope.showalert_inventory_identing=false;
		
		
		$scope.treatmentIndenting = {
			centreId:null,
			requestDate:null,
			requiredByDate:null,
			stockOrderTo:null,
			status:null
			
		};
		
		
		$scope.treatmentIndentingItems=[];
		$scope.treatmentIndentingItem = {
				itemNumber:null,
				type:null,
				itemName:null,
				usageType:null,
				brandName:null,
				quantityRequired:null,
				availableQuantity:null,
				quantityMeasurementType:null,
				saved:false
		};
		
		
		
		
		$scope.addItem = function(){
			
			$scope.showalert_inventory_identing=false;
		    $scope.treatmentIndentingItem.lastModifiedBy = authorize.getUsername();
			if($scope.treatmentIndentingItems.length)
				$scope.treatmentIndentingItem.itemNumber = $scope.treatmentIndentingItems[$scope.treatmentIndentingItems.length - 1].itemNumber + 1;
			else $scope.treatmentIndentingItem.itemNumber = 0;
			
			$scope.treatmentIndentingItem.type="Raised";
			
			$scope.treatmentIndentingItems.push($scope.treatmentIndentingItem);
			console.log($scope.treatmentIndentingItem);
			
			$scope.inventoryIdentingForm.$setPristine();
			
			$scope.treatmentIndentingItem = {
				itemNumber:null,
				type:null,
				itemName:null,
				usageType:null,
				brandName:null,
				quantityRequired:null,
				availableQuantity:null,
				quantityMeasurementType:null,
				saved:false
		};
			
			
			
		}
		
		
		/*$scope.removeEvent = function(id){
			$scope.showalert_events=false;
		    for (var i = $scope.events.length - 1; i >= 0; i--) {
                if($scope.events[i].ID == id){
                	if($scope.events[i].saved)
                		patientFactory.getPatientMajorClinicalEvents($scope.view?$scope.patient.id:$scope.newpatient_basic.id,authorize.getCentre()).delete({clinicalEventId:$scope.events[i].id});
                	// get all clinical events of a patient find matching event, get id and then delete or delete by event detail
                    $scope.events.splice(i,1);

                }
            }
		};
		
		$scope.updateClinical = function(){
			console.log('in Update Clinical function');
			if($scope.event.details !== '' || $scope.event.comments !== '' || $scope.event.date !== null){
				if($scope.events.length)
					$scope.event.ID = $scope.events[$scope.events.length - 1].ID + 1;
				else $scope.event.ID = 0;
				$scope.event.patientId = $scope.patient.id;
				$scope.event.lastModifiedBy = authorize.getUsername();
				console.log("why are you here");
				$scope.events.push($scope.event);
				console.log($scope.event);
			}
			var x = 0;
			for(var i = 0; i<$scope.events.length;i++){
				console.log(JSON.parse(JSON.stringify($scope.events[i])));
				if(!$scope.events[i].saved){
					$scope.events[i].saved = true;
					var id ;
					console.log("i" + i);
					console.log("x:outside " + x);
					patientFactory.getPatientMajorClinicalEvents($scope.patient.id,authorize.getCentre()).save($scope.events[i])
					.$promise.then(function(response){
						$scope.showalert_events=true;
						$scope.showAlertClinical = true;
						$scope.message = "Updated Clinical Events Successfully";			
						console.log($scope.events[x]);
						$scope.events[x].id = response.id;
						console.log("x:inside " + x);
						x++;
					},function(response){
						$scope.showAlertClinical = true;
						$scope.message = "Error: " + response.status + " " + response.statusText; 
					});	
				}
				else {
					$scope.events[i].lastModifiedBy = authorize.getUsername();
					patientFactory.getPatientMajorClinicalEvents($scope.patient.id,authorize.getCentre()).update({
						clinicalEventId:$scope.events[i].id
					},$scope.events[i]).$promise.then(function(response){
						$scope.showAlertClinical = true;
						$scope.message = "Updated Clinical Events Successfully";			
					},function(response){
						$scope.showAlertClinical = true;
						$scope.message = "Error: " + response.status + " " + response.statusText; 
					});
					x++;
				}
			}
			$scope.updateMyValuesFromClinical(false,$scope.showAlertClinical, $scope.message);
			$scope.clinicalEventForm.$setPristine();
			$scope.event = {
				ID:null,
				date:'',
				details:"",
				comments:"",
				saved:false
	        };	
		}; */

		$scope.sendRequest = function(){
			if($scope.treatmentIndenting.itemName !== '' || $scope.treatmentIndenting.usageType !== '' || $scope.treatmentIndenting.brandName !== ''
				|| $scope.treatmentIndenting.quantityRequired !== ''|| $scope.treatmentIndenting.avalaibleQuantity !== ''|| $scope.treatmentIndenting.quantityMeasurementType !== ''){
				
				if($scope.treatmentIndentingItems.length)
					$scope.treatmentIndentingItem.itemNumber = $scope.treatmentIndentingItems[$scope.treatmentIndentingItems.length - 1].itemNumber + 1;
				else 
					$scope.treatmentIndentingItem.itemNumber = 0;
			
				$scope.treatmentIndentingItem.lastModifiedBy = authorize.getUsername();
				$scope.treatmentIndentingItem.type="Raised";

				$scope.treatmentIndentingItems.push($scope.treatmentIndentingItem);
				console.log($scope.treatmentIndentingItem);
			}
			/////////////////////////////////
			
			$scope.treatmentIndenting.centreId=authorize.getCentre();
			inventoryFactory.getIdents(authorize.getCentre()).save($scope.treatmentIndenting).$promise.then(function(response){
				
					$scope.indentId=response.indentId;
				
				
					var x = 0;
					for(var i = 0; i<$scope.treatmentIndentingItems.length;i++){
						
						scope.treatmentIndentingItems[i].indentId=response.indentID;
						if(!$scope.treatmentIndentingItems[i].saved){
							$scope.treatmentIndentingItems[i].saved = true;
							var id ;
							console.log("i" + i);
							console.log("x:outside " + x);
							inventoryFactory.getIdentsItems(authorize.getCentre(),response.indentId).save($scope.treatmentIndentingItems[i]).$promise.then(function(response){
								//$scope.showalert_events=true;
								console.log($scope.treatmentIndentingItems[x]);
								//$scope.events[x].id = response.id;
								//console.log("x:inside " + x);
								x++;
							},function(response){
								$scope.showalert_events=false;
								console.log(response);
							});	
						}
						else x++;
					}
					for(var i = 0; i<$scope.treatmentIndentingItems.length;i++){
						console.log($scope.treatmentIndentingItems[i].id + " " + $scope.treatmentIndentingItems[i].saved);
					}
					$scope.inventoryIdentingForm.$setPristine();
					$scope.savedOnce = true;
					$scope.treatmentIndenting = {
						centreId:null,
						requestDate:null,
						requiredByDate:null,
						stockOrderTo:null,
						status:null
						
					};
		
		
		//$scope.treatmentIndentingItems=[];
					$scope.treatmentIndentingItem = {
							itemNumber:null,
							type:null,
							itemName:null,
							usageType:null,
							brandName:null,
							quantityRequired:null,
							availableQuantity:null,
							quantityMeasurementType:null,
							saved:false
					};
				
				
				
				
				
				
				
			});

			
			
		};
		
		

}])
;