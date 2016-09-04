'use strict';
angular.module('App')
.controller('AddTreatmentConsumptionController',['$scope','authorize','appointmentFactory','inventoryFactory','regularForm','$uibModal','choosePatientFactory', function($scope,authorize,appointmentFactory, inventoryFactory, regularForm,$uibModal , choosePatientFactory){
		// $scope.regularForm = regularForm.regularForm;
		// $scope.pendingTreatments=[];
		// $scope.showAlert=false;

		// // $scope.treatmentInventory= {
		// // 	treatmentId:null,
		// // 	treatmentType:null,
		// // 	saved:false
		// // };
		// $scope.pendingTreatments = [];
		// $scope.daysToLoop = {};
		// appointmentFactory.getPastAppointments(authorize.getCentre()).query({attended:true}).$promise.then(function(response){
		// 	$scope.appointments = response;
		// 	inventoryFactory.getConsumptions(authorize.getCentre()).query().$promise.then(function(response){
		// 		$scope.consumptions = response;
		// 		for(var i=0;i<$scope.appointments.length;i++)
		// 		{
		// 			var present = false;
		// 			for(var j=0;j<$scope.consumptions.length;j++){
		// 				if($scope.appointments[i].appointmentId == $scope.consumptions[j].treatmentId)
		// 					present=true;
		// 			}
		// 			if(present == false){
		// 				$scope.pendingTreatments.push($scope.appointments[i]);
		// 				$scope.daysToLoop[$scope.appointments[i].dayOfTheWeek] = true;
		// 			}

		// 		}
		// 		console.log('length of pending treatments :'+$scope.pendingTreatments.length);
		// 		if($scope.pendingTreatments.length == 0)
		// 		{
		// 			$scope.message = 'All treatment consumptions added!';
		// 			$scope.messageColor = 'success';
		// 			$scope.showAlert = true;
		// 		}
		// 	},function(response){
		// 		alert('Failed to retrieve consumptions');
		// 	})
		// 	console.log(response);
		// },function(response){alert('Failed to retrieve appointments')})
		// // need to add attributes of editable table given in excel
		$scope.openAddConsumption = function(appointmentId){
			var appointment = choosePatientFactory.getAppointment();
			console.log('recieved appointment is ');
			console.log(appointment);
			if(appointment.treatmentConsumptionAdded)
			{
				$scope.message = "Treatment consumption already added!";
				$scope.messageColor = "success";
				return;
			}
			$uibModal.open({
              templateUrl: 'views/inventory/addTreatmentConsumptionModal.html',
              controller: 'AddConsumptionModalController',
              size:'lg',
	          resolve: {
	            appointmentId: function () {
	             return appointment.appointmentId;
	            }
	          }
            });
		};
		$scope.openAddConsumption();
	
	}])
.controller('AddConsumptionModalController', ['$scope', '$state', 'authorize', '$uibModalInstance', 'appointmentId','inventoryFactory','appointmentFactory', function ($scope, $state, authorize, $uibModalInstance, appointmentId,inventoryFactory, appointmentFactory) {

		$scope.appointmentId = appointmentId;
		$scope.consumption={
				centreId:authorize.getCentre(),
				treatmentId:$scope.appointmentId,
				treatmentType:null,
				lastModifiedBy: authorize.getUsername()
			};
		appointmentFactory.getAppointments(authorize.getCentre()).get({appointmentId: $scope.appointmentId}).$promise.then(function(response){
			$scope.consumption.treatmentDate = response.date;
			if($scope.consumption.treatmentDate == null)
				$scope.consumption.treatmentDate = "2016-07-14";
			$scope.consumption.patientId = response.patientId;
		});

		$scope.quantityError = function(){
			if(!$scope.message.includes('Atleast one item unavailable in floor')){
				$scope.message = 'Quantity Error. Check quantity for the item.';
				$scope.messageColor = 'danger';
				$scope.showAlert = true;
			}
			else if(!scope.message.includes('Quantity Error. Check quantity for the item.'))
				$scope.message = $scope.message + ' Quantity Error. Check quantity for the item.';
		}
		$scope.updateAvailableQuantity = function(index){
			// console.log('checking');
			// if(!(dialysisTabularItems[index].chosen.brandName.length!=0 && dialysisTabularItems[index].chosen.brandName!=null &&dialysisTabularItems[index].chosen.quantityMeasurementType.length!=0 && dialysisTabularItems[index].chosen.quantityMeasurementType!=null))
			// 	return;
			//console.log('wroking index: '+index);
			if($scope.consumption.treatmentType=='Single Use' || $scope.consumption.treatmentType=='Reuse' || $scope.consumption.treatmentType=='New Dialyser'){
					inventoryFactory.getFloor(authorize.getCentre()).query().$promise.then(function(response){
						var floorItems = response;
						$scope.dialysisTabularItems[index].availableQuantity = 0;
						for(var j=0;j<floorItems.length;j++){
						if($scope.dialysisTabularItems[index].itemName == floorItems[j].item.itemName && $scope.dialysisTabularItems[index].chosen.brandName == floorItems[j].item.brandName && $scope.dialysisTabularItems[index].chosen.quantityMeasurementType == floorItems[j].item.quantityMeasurementType &&floorItems[j].item.availableQuantity!=0){
								$scope.dialysisTabularItems[index].availableQuantity = floorItems[j].availableQuantity;
								//console.log('available '+$scope.dialysisTabularItems[index].itemName+' '+$scope.dialysisTabularItems[index].chosen.brandName+' '+floorItems[j].item.quantityMeasurementType+' '+floorItems[j].availableQuantity);
							}
						}
						if($scope.dialysisTabularItems[index].availableQuantity == null || $scope.dialysisTabularItems[index].availableQuantity == 0)
						{
							$scope.dialysisTabularItems[index].availableQuantity = 0;
							$scope.message = 'Atleast one item unavailable in floor';
							$scope.messageColor = 'danger';
							$scope.messageIndex = index;
							$scope.showAlert = true;
						}
						else if(index == $scope.messageIndex || $scope.message != 'Atleast one item unavailable in floor')
							$scope.showAlert = false;
					})
					
			}
			else if($scope.consumption.treatmentType=='Catheterization Single Lumen' || $scope.consumption.treatmentType=='Catheterization Double Lumen') {
					inventoryFactory.getFloor(authorize.getCentre()).query().$promise.then(function(response){
						var floorItems = response;
						$scope.catheterizationTabularItems[index].availableQuantity = 0;
						for(var j=0;j<floorItems.length;j++){
						if($scope.catheterizationTabularItems[index].itemName == floorItems[j].item.itemName && $scope.catheterizationTabularItems[index].chosen.brandName == floorItems[j].item.brandName && $scope.catheterizationTabularItems[index].chosen.quantityMeasurementType == floorItems[j].item.quantityMeasurementType){
								$scope.catheterizationTabularItems[index].availableQuantity = floorItems[j].availableQuantity;
							}
						}
						if($scope.catheterizationTabularItems[index].availableQuantity == null || $scope.catheterizationTabularItems[index].availableQuantity == 0)
						{
							$scope.catheterizationTabularItems[index].availableQuantity = 0;
							$scope.message = 'Atleast one item unavailable in floor';
							$scope.messageColor = 'danger';
							$scope.messageIndex = index;
							$scope.showAlert = true;
						}
						else if(index == $scope.messageIndex || $scope.message != 'Atleast one item unavailable in floor')
							$scope.showAlert = false;
					})
			}
		}

		// $scope.consumptionDialysis={
		// 	itemName:null,
		// 	brandName:null,
		// 	quantityMeasurementType:null
		// };
		$scope.itemQuantity={};
		$scope.dialysisTabularItems=[];
		$scope.catheterizationTabularItems=[];
		inventoryFactory.getDialysisItems().query().$promise.then(function(response){
			$scope.dialysisItems = [];
			for(var i=0;i<response.length;i++)
				if(response[i].item.usageType=='Treatment Specific')
					$scope.dialysisItems.push(response[i]);
			for(var i=0;i<$scope.dialysisItems.length;i++)
			{
				var present = false;
				for(var j=0;j<$scope.dialysisTabularItems.length;j++)
				{
					if($scope.dialysisItems[i].item.itemName == $scope.dialysisTabularItems[j].itemName)
						present = true;
				}
				if(present == true)
					{
						//console.log('itemName '+$scope.dialysisItems[i].item.itemName+' already present!');
						continue;
					}

				var dialysisTabularItem = {itemName:null, brandName:[],quantityMeasurementType:[]};
				dialysisTabularItem.itemName = $scope.dialysisItems[i].item.itemName;
				dialysisTabularItem.itemId = $scope.dialysisItems[i].itemId;
				for(var j=i;j<$scope.dialysisItems.length;j++){
					if(dialysisTabularItem.itemName == $scope.dialysisItems[j].item.itemName)
					{
						//console.log('same name found '+dialysisTabularItem.itemName);
						//checking for brandName
						var present = false;
						for(var k=0;k<dialysisTabularItem.brandName.length;k++)
							if($scope.dialysisItems[j].item.brandName == dialysisTabularItem.brandName[k])
								present=true;
						if(present==false)
							dialysisTabularItem.brandName.push($scope.dialysisItems[j].item.brandName);
	
	
						//checking for quantityMeasurementType
						present = false;
						for(var k=0;k<dialysisTabularItem.quantityMeasurementType.length;k++)
							if($scope.dialysisItems[j].item.quantityMeasurementType == dialysisTabularItem.quantityMeasurementType[k])
								present=true;
						if(present==false)
							dialysisTabularItem.quantityMeasurementType.push($scope.dialysisItems[j].item.quantityMeasurementType);
					}
				}

				$scope.dialysisTabularItems.push(dialysisTabularItem);
			}
		},function(response){
			alert('failed to retrieve dialysis items');
		});

		inventoryFactory.getCatheterizationItems().query().$promise.then(function(response){
			$scope.catheterizationItems = [];
			for(var i=0;i<response.length;i++)
				if(response[i].item.usageType=='Treatment Specific')
					$scope.catheterizationItems.push(response[i]);
			for(var i=0;i<$scope.catheterizationItems.length;i++)
			{
				var present = false;
				for(var j=0;j<$scope.catheterizationTabularItems.length;j++)
				{
					if($scope.catheterizationItems[i].item.itemName == $scope.catheterizationTabularItems[j].itemName)
						present = true;
				}
				if(present == true)
					{
						//console.log('itemName '+$scope.catheterizationItems[i].item.itemName+' already present!');
						continue;
					}

				var catheterizationTabularItem = {itemName:null, brandName:[],quantityMeasurementType:[]};
				catheterizationTabularItem.itemName = $scope.catheterizationItems[i].item.itemName;
				catheterizationTabularItem.itemId = $scope.catheterizationItems[i].itemId;
				for(var j=i;j<$scope.catheterizationItems.length;j++){
					if(catheterizationTabularItem.itemName == $scope.catheterizationItems[j].item.itemName)
					{
						//console.log('same name found '+catheterizationTabularItem.itemName);
						//checking for brandName
						var present = false;
						for(var k=0;k<catheterizationTabularItem.brandName.length;k++)
							if($scope.catheterizationItems[j].item.brandName == catheterizationTabularItem.brandName[k])
								present=true;
						if(present==false)
							catheterizationTabularItem.brandName.push($scope.catheterizationItems[j].item.brandName);
	
	
						//checking for quantityMeasurementType
						present = false;
						for(var k=0;k<catheterizationTabularItem.quantityMeasurementType.length;k++)
							if($scope.catheterizationItems[j].item.quantityMeasurementType == catheterizationTabularItem.quantityMeasurementType[k])
								present=true;
						if(present==false)
							catheterizationTabularItem.quantityMeasurementType.push($scope.catheterizationItems[j].item.quantityMeasurementType);
					}
				}

				$scope.catheterizationTabularItems.push(catheterizationTabularItem);
			}
		},function(response){
			alert('failed to retrieve catheterization items');
		});

		$scope.addConsumption = function(response){
			if($scope.consumption.treatmentType=='Single Use' || $scope.consumption.treatmentType=='Reuse' || $scope.consumption.treatmentType=='New Dialyser')
			{		

				for(var i=0;i<$scope.dialysisTabularItems.length;i++){
					if($scope.dialysisTabularItems[i].chosen.quantity==null || $scope.dialysisTabularItems[i].availableQuantity==null || $scope.dialysisTabularItems[i].chosen.quantity<0 || $scope.dialysisTabularItems[i].chosen.quantity>$scope.dialysisTabularItems[i].availableQuantity || $scope.dialysisTabularItems[i].availableQuantity==0){
						$scope.message = 'One of the fields blank/invalid';
						$scope.messageColor = 'danger';
						$scope.showAlert = true;
						return;
					}
				}
				//console.log('adding consumption now'); return;
				appointmentFactory.getAppointments(authorize.getCentre()).update({appointmentId:$scope.appointmentId},{treatmentConsumptionAdded:true});
				inventoryFactory.getConsumptions(authorize.getCentre()).save($scope.consumption).$promise.then(function(response){
			
							$scope.consumptionItems = [];
							for(var i=0;i<$scope.dialysisTabularItems.length;i++){
								for(var j=0;j<$scope.dialysisItems.length;j++){
									if($scope.dialysisTabularItems[i].itemName == $scope.dialysisItems[j].item.itemName && $scope.dialysisTabularItems[i].chosen.brandName == $scope.dialysisItems[j].item.brandName && $scope.dialysisTabularItems[i].chosen.quantityMeasurementType == $scope.dialysisItems[j].item.quantityMeasurementType){
											var consumptionItem = {treatmentId: $scope.consumption.treatmentId,itemId: $scope.dialysisItems[j].item.itemId,quantity:$scope.dialysisTabularItems[i].chosen.quantity,lastModifiedBy:authorize.getUsername()};
											inventoryFactory.getConsumptionItems(authorize.getCentre(),$scope.consumption.treatmentId).save(consumptionItem).$promise.then(function(response){},function(response){alert('saving consumption items failed')});
											$scope.consumptionItems.push(consumptionItem);
									}
								}
							}
			
							inventoryFactory.getFloor(authorize.getCentre()).query().$promise.then(function(response){
									$scope.floorItems= response;
									for(var i=0;i<$scope.consumptionItems.length;i++){
										var present = false;
										//console.log('outer loop');
										for(var j=0;j<$scope.floorItems.length;j++)
										{
											//console.log('comparing '+$scope.floorItems[j].itemId+' and '+$scope.consumptionItems[i].itemId);
											if($scope.floorItems[j].itemId == $scope.consumptionItems[i].itemId)
											{
												//console.log("item "+$scope.floorItems[j].itemId+' present');
												$scope.floorItems[j].availableQuantity-=$scope.consumptionItems[i].quantity;
												inventoryFactory.getFloor(authorize.getCentre()).update({centreId:$scope.floorItems[j].centreId, itemId: $scope.floorItems[j].itemId},$scope.floorItems[j]);
												present = true;
											}
										}
									}
								});
			
							$scope.message='Saved successfully!';
							$scope.messageColor='success';
							$scope.showAlert=true;
							$uibModalInstance.close();
				    		$state.go('app.choosePatientMatrix', {callback:'inventory.consumption.new'}, {reload: true});
										
						},function(response){
							alert('consumption save failed');
							$scope.message='Saving failed';
							$scope.messageColor='danger';
							$scope.showAlert=true;
						});
				}

				else if($scope.consumption.treatmentType=='Catheterization Single Lumen' || $scope.consumption.treatmentType=='Catheterization Double Lumen')
				{		

					for(var i=0;i<$scope.catheterizationTabularItems.length;i++){
						if($scope.catheterizationTabularItems[i].chosen.quantity==null || $scope.catheterizationTabularItems[i].availableQuantity==null || $scope.catheterizationTabularItems[i].chosen.quantity<0 || $scope.catheterizationTabularItems[i].chosen.quantity>$scope.catheterizationTabularItems[i].availableQuantity || $scope.catheterizationTabularItems[i].availableQuantity==0){
							$scope.message = 'One of the fields blank/invalid';
							$scope.messageColor = 'danger';
							$scope.showAlert = true;
							return;
						}
					}

					//console.log('adding nowww.. :/'); return;
					inventoryFactory.getConsumptions(authorize.getCentre()).save($scope.consumption).$promise.then(function(response){
			
							$scope.consumptionItems = [];
							for(var i=0;i<$scope.catheterizationTabularItems.length;i++){
								for(var j=0;j<$scope.catheterizationItems.length;j++){
									if($scope.catheterizationTabularItems[i].itemName == $scope.catheterizationItems[j].item.itemName && $scope.catheterizationTabularItems[i].chosen.brandName == $scope.catheterizationItems[j].item.brandName && $scope.catheterizationTabularItems[i].chosen.quantityMeasurementType == $scope.catheterizationItems[j].item.quantityMeasurementType){
											var consumptionItem = {treatmentId: $scope.consumption.treatmentId,itemId: $scope.catheterizationItems[j].item.itemId,quantity:$scope.catheterizationTabularItems[i].chosen.quantity,lastModifiedBy:authorize.getUsername()};
											inventoryFactory.getConsumptionItems(authorize.getCentre(),$scope.consumption.treatmentId).save(consumptionItem).$promise.then(function(response){},function(response){alert('saving consumption items failed')});
											$scope.consumptionItems.push(consumptionItem);
									}
								}
							}
			
							inventoryFactory.getFloor(authorize.getCentre()).query().$promise.then(function(response){
									$scope.floorItems= response;
									for(var i=0;i<$scope.consumptionItems.length;i++){
										var present = false;
										//console.log('outer loop');
										for(var j=0;j<$scope.floorItems.length;j++)
										{
											//console.log('comparing '+$scope.floorItems[j].itemId+' and '+$scope.consumptionItems[i].itemId);
											if($scope.floorItems[j].itemId == $scope.consumptionItems[i].itemId)
											{
												//console.log("item "+$scope.floorItems[j].itemId+' present');
												$scope.floorItems[j].availableQuantity-=$scope.consumptionItems[i].quantity;
												inventoryFactory.getFloor(authorize.getCentre()).update({centreId:$scope.floorItems[j].centreId, itemId: $scope.floorItems[j].itemId},$scope.floorItems[j]);
												present = true;
											}
										}
									}
								});
			
							$scope.message='Saved successfully!';
							$scope.messageColor='success';
							$scope.showAlert=true;
							$uibModalInstance.close();
				    		$state.go('app.choosePatientMatrix', {callback:'inventory.consumption.new'}, {reload: true});
			
						},function(response){
							alert('consumption save failed');
							$scope.message='Saving failed';
							$scope.messageColor='danger';
							$scope.showAlert=true;
						});
				}
			
		};

		$scope.updateQuantityType = function(index){
			if($scope.consumption.treatmentType=='Single Use' || $scope.consumption.treatmentType=='Reuse' || $scope.consumption.treatmentType=='New Dialyser')
			{
				$scope.dialysisTabularItems[index].quantityMeasurementType=[];
					for(var i=0;i<$scope.dialysisItems.length;i++)
					{
						if($scope.dialysisTabularItems[index].quantityMeasurementType.indexOf($scope.dialysisItems[i].item.quantityMeasurementType)==-1)
							{
								//console.log($scope.dialysisItems[i].item.quantityMeasurementType);
								if($scope.dialysisTabularItems[index].itemName == $scope.dialysisItems[i].item.itemName && $scope.dialysisTabularItems[index].chosen.brandName == $scope.dialysisItems[i].item.brandName)
									{
										//console.log('successful');
										$scope.dialysisTabularItems[index].quantityMeasurementType.push($scope.dialysisItems[i].item.quantityMeasurementType);
									}
							}
					}
			}
			else if($scope.consumption.treatmentType=='Catheterization Single Lumen' || $scope.consumption.treatmentType=='Catheterization Double Lumen'){
				$scope.catheterizationTabularItems[index].quantityMeasurementType=[];
					for(var i=0;i<$scope.catheterizationItems.length;i++)
					{
						if($scope.catheterizationTabularItems[index].quantityMeasurementType.indexOf($scope.catheterizationItems[i].item.quantityMeasurementType)==-1)
							{
								//console.log($scope.catheterizationItems[i].item.quantityMeasurementType);
								if($scope.catheterizationTabularItems[index].itemName == $scope.catheterizationItems[i].item.itemName && $scope.catheterizationTabularItems[index].chosen.brandName == $scope.catheterizationItems[i].item.brandName)
									{
										//console.log('successful');
										$scope.catheterizationTabularItems[index].quantityMeasurementType.push($scope.catheterizationItems[i].item.quantityMeasurementType);
									}
							}
					}
			}
			return true;
		}
	    //$uibModalInstance.close();
	    //$state.go('app.home', {}, {reload: true});

}])

;