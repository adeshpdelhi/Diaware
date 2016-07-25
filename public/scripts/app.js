'use strict';
//add resolve objects
angular.module('App', ['ui.router','ngResource','ngDialog','ui.bootstrap','ngMaterial', 'ngMessages','ngCookies'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller : 'HeaderController'
                    },
                    'content': {
                        controller  : 'HomeManagementController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                        controller : 'FooterController'
                    }
                }

            })
            .state('app.login', {
                url:'login',
                views: {
                    'content@': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'        
                    }
                }

            })
            .state('app.home', {
                url:'home',
                views: {
                    'content@': {
                        templateUrl : 'views/home.html',
                        controller:'DashBoardController'           
                    }
                }

            })

            .state('app.registration', {
                url:'registration/',
                views: {
                    'content@': {
                        templateUrl : 'views/registration/home.html'
                    }
                }

            })

            .state('app.registration.new', {
                url:'new',
                views: {
                    'content@': {
                        templateUrl : 'views/registration/newregister.html',
                        controller : 'NewRegistrationController'
                    }
                }

            })

            .state('app.registration.view', {
                url:'view',
                views: {
                    'content@': {
                        templateUrl : 'views/registration/ViewRegistration/view.html',
                        controller : 'ViewRegistrationController'
                    }
                }

            })
			
			
			.state('app.dialysis_care_plan', {
                url:'dialysis_care_plan/',
            })

            .state('app.dialysis_care_plan.new', {
                url:'new',
                views: {
                    'content@': {
                        templateUrl : 'views/dialysis_care_plan/dialysis_care_plan.html',
                        controller  : 'DialysisCarePlanController'        
                    }
                }

            })
			
			 .state('app.dialysis_care_plan.view', {
                url:'view',
                views: {
                    'content@': {
                        templateUrl : 'views/dialysis_care_plan/ViewDialysisCarePlan/view_dialysis_care_plan.html',
                        controller  : 'ViewDialysisCarePlanController'        
                    }
                }

            })

            .state('app.monitoring', {
                url:'monitoring/',
            })

            .state('app.monitoring.new', {
                url:'new?patientId&date',
                views: {
                    'content@': {
                        // templateUrl : 'views/monitoring/newmonitoringchart.html',
                        templateUrl : 'views/monitoring/newmonitoringchart.html',
                        controller : 'MonitoringController'
                    }
                }

            })

            .state('app.monitoring.view', {
                url:'view?patientId&date',
                views: {
                    'content@': {
                        templateUrl : 'views/monitoring/ViewMonitoringChart/viewmonitoringchart.html',
                        controller : 'ViewMonitoringController',
                        resolve:{
                            chosenPatientId:['choosePatientFactory','$stateParams', function(choosePatientFactory,$stateParams){
                                console.log("helloooooooooo");
                                return choosePatientFactory.getChosenPatient().id;
                            }]
                            // patient:['$state','monitoringChartFactory','choosePatientFactory','$stateParams',function($state,monitoringChartFactory,choosePatientFactory,$stateParams){
                            //     console.log('yeaaaaaaaaaa');
                                
                            //     // if($state.params.patientId && $state.params.date){
                            //     //     return monitoringChartFactory.getPreBasic($state.params.patientId).get({monitoringDate:$state.params.date});
                            //     // }
                            // }]
                        }
                    }
                }

            })
			
			.state('app.inventory', {
                url:'inventory/',
            })

            .state('app.inventory.vendor', {
                url:'vendor/'
            })
            .state('app.inventory.vendor.new', {
                url:'new',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/addVendor.html',
                        controller  : 'AddVendorController'        
                    }
                }

            })

            .state('app.inventory.vendor.view', {
                url:'view',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/ViewInventory/viewVendor.html',
                        controller  : 'ViewVendorController'        
                    }
                }

            })

            .state('app.inventory.indent', {
                url:'indent/'
            })

            .state('app.inventory.indent.new', {
                url:'new',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/addIndent.html',
                        controller  : 'AddIndentController'        
                    }
                }

            })

            .state('app.inventory.indent.view', {
                url:'view',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/ViewInventory/viewIndents.html',
                        controller  : 'ViewIndentsController'        
                    }
                }

            })

            .state('app.inventory.stock', {
                url:'stock/'
            })

            .state('app.inventory.stock.issued', {
                url:'issued/'
            })

            .state('app.inventory.stock.view', {
                url:'view',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/ViewInventory/viewStocks.html',
                        controller  : 'ViewStocksController'
                    }
                }

            })

            .state('app.inventory.stock.issued.new', {
                url:'new',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/issueStock.html',
                        controller  : 'IssueStockController'
                    }
                }

            })

            .state('app.inventory.stock.issued.view', {
                url:'view',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/ViewInventory/viewIssueStock.html',
                        controller  : 'ViewIssueStockController'
                    }
                }

            })

            .state('app.inventory.consumption', {
                url:'consumption/'
            })

            .state('app.inventory.consumption.new', {
                url:'new',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/addTreatmentConsumption.html',
                        controller  : 'AddTreatmentConsumptionController'
                    }
                }

            })

            .state('app.inventory.consumption.view', {
                url:'view',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/ViewInventory/viewTreatmentConsumption.html',
                        controller  : 'ViewTreatmentConsumptionController'
                    }
                }

            })


            .state('app.inventory.floor', {
                url:'floor/'
            })


            .state('app.inventory.floor.view', {
                url:'view',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/ViewInventory/viewFloor.html',
                        controller  : 'ViewFloorController'
                    }
                }

            })

            // .state('app.inventory.new_inventory_identing', {
            //     url:'Inventory_Identing/new',
            //     views: {
            //         'content@': {
            //             templateUrl : 'views/inventory/inventoryIdenting.html',
            //             controller  : 'InventoryIdentingController'        
            //         }
            //     }

            // })
			
			// .state('app.inventory.new_stock_received', {
   //              url:'Stock_Received/new',
   //              views: {
   //                  'content@': {
   //                      templateUrl : 'views/inventory/stockReceived.html',
   //                      controller  : 'StockReceivedController'        
   //                  }
   //              }

   //          })
			
			// .state('app.inventory.new_issue_stock', {
   //              url:'Issue_Stock/new',
   //              views: {
   //                  'content@': {
   //                      templateUrl : 'views/inventory/issueStock.html',
   //                      controller  : 'IssueStockController'        
   //                  }
   //              }

   //          })
			
			// .state('app.inventory.new_treatment_inventory', {
   //              url:'Treatment_Inventory_Consumption/new',
   //              views: {
   //                  'content@': {
   //                      templateUrl : 'views/inventory/treatmentInventory.html',
   //                      controller  : 'TreatmentInventoryController'        
   //                  }
   //              }

   //          })
			
			// .state('app.inventory.newvendor', {
   //              url:'Vendor/new',
   //              views: {
   //                  'content@': {
   //                      templateUrl : 'views/inventory/addVendor.html',
   //                      controller  : 'AddVendorController'        
   //                  }
   //              }

   //          })
			

			////////////////////////////////////
			
			// .state('app.inventory.view_inventory_identing', {
   //              url:'Inventory_Identing/view',
   //              views: {
   //                  'content@': {
   //                      templateUrl : 'views/inventory/ViewInventory/viewInventoryIdenting.html',
   //                      controller  : 'ViewInventoryIdentingController'        
   //                  }
   //              }

   //          })
			
			// .state('app.inventory.view_stock_received', {
   //              url:'Stock_Received/view',
   //              views: {
   //                  'content@': {
   //                      templateUrl : 'views/inventory/ViewInventory/viewStockReceived.html',
   //                      controller  : 'ViewStockReceivedController'        
   //                  }
   //              }

   //          })
			
			// .state('app.inventory.view_issue_stock', {
   //              url:'Issue_Stock/view',
   //              views: {
   //                  'content@': {
   //                      templateUrl : 'views/inventory/ViewInventory/viewIssueStock.html',
   //                      controller  : 'ViewIssueStockController'        
   //                  }
   //              }

   //          })
			
			// .state('app.inventory.view_treatment_inventory', {
   //              url:'Treatment_Inventory_Consumption/view',
   //              views: {
   //                  'content@': {
   //                      templateUrl : 'views/inventory/ViewInventory/viewTreatmentInventory.html',
   //                      controller  : 'ViewTreatmentInventoryController'        
   //                  }
   //              }

   //          })
			
			// .state('app.inventory.view_vendor', {
   //              url:'Vendor/view',
   //              views: {
   //                  'content@': {
   //                      templateUrl : 'views/inventory/ViewInventory/viewVendor.html',
   //                      controller  : 'ViewVendorController'        
   //                  }
   //              }

   //          })
			
			////////////////////////////////////
			
            .state('app.billing',{
                url:"billing/",
                views:{
                    'content@':{
                        templateUrl:'views/billing/home.html'
                        // controller:'BillingHomeController'
                    }
                }
            })
            .state('app.choosePatient',{
                url:'choosePatient/:callback',
                views:{
                    'content@':{
                        templateUrl:'views/choosePatient.html',
                        controller:'ChoosePatientController'
                    }
                }
            })
            .state('app.billing.newbill',{
                url:'newbill',
                views:{
                    'content@':{
                        templateUrl:'views/billing/newbill.html',
                        controller:'NewBillController'
                    }
                }
            })
            .state('app.billing.viewbill',{
                url:'viewbill/',
                views:{
                    'content@':{
                        templateUrl:'views/billing/viewbill.html',
                        controller:'ViewBillController'
                    }
                }
            })
            .state('app.billing.viewbill.details',{
                url:'details/:id',
                views:{
                    'content@':{
                        templateUrl:'views/billing/viewBillDetails.html',
                        controller:'ViewBillDetailsController',
                        resolve:{
                            bill:['$stateParams','billFactory','authorize', function($stateParams,billFactory,authorize){
                                return billFactory.getBills(authorize.getCentre()).get({billId:parseInt($stateParams.id)})
                            }]
                        }
                    }
                }
            })
            .state('app.admin',{
                url:"admin/"
                // views:{
                //     'content@':{
                //         template:'views/admin/editDataBase.html',
                //     }
                // }
            })
            .state('app.admin.editdatabase',{
                url:"editdatabase",
                views:{
                    'content@':{
                        templateUrl:'views/admin/editDataBase.html',
                        controller:'DataBaseController'
                    }
                }
            })
            .state('app.admin.adduser',{
                url:"adduser",
                views:{
                    'content@':{
                        templateUrl:'views/admin/addUser.html',
                        controller:'AddUserController'
                    }
                }
            })
            .state('app.admin.viewuser',{
                url:"viewuser",
                views:{
                    'content@':{
                        templateUrl:'views/admin/viewUser.html',
                        controller:'ViewUserController'
                    }
                }
            })
			
			.state('app.admin.addcentre',{
                url:"addcentre",
                views:{
                    'content@':{
                        templateUrl:'views/admin/addCentre.html'
                        // controller:'AddCentreController'
                    }
                }
            })
			.state('app.admin.editcentre',{
                url:"editcentre",
                views:{
                    'content@':{
                        templateUrl:'views/admin/editCentre.html',
                        controller:'EditCentreController'
                    }
                }
            })
            .state('app.appointment',{
                url:"appointment/",
                views:{
                    'content@':{
                        templateUrl:'views/appointments/appointment.html',
                        controller:'AppointmentController',
                        resolve:{
                            patient:['authorize','patientFactory','choosePatientFactory', function(authorize,patientFactory,choosePatientFactory){
                                return patientFactory.getPatients(authorize.getCentre()).get({id:choosePatientFactory.getChosenPatient().id,getShifts:true,getMedicalHistory:true});
                            }]
                        }
                    }
                }
            })
            .state('app.appointment.viewAppointments',{
                url:"viewAppointments/",
                views:{
                    'content@':{
                        templateUrl:'views/appointments/viewAppointmentNew.html',
                        controller:'ViewAppointmentsController'
                    }
                }
            })
            .state('app.appointment.viewAppointments.details',{
                url:'details/:id?filter',
                views:{
                    'content@':{
                        templateUrl:'views/appointments/viewAppointmentDetails.html',
                        controller:'ViewAppointmentDetailsController',
                        resolve:{
                            appointment:['$stateParams','appointmentFactory','authorize','$state', function($stateParams,appointmentFactory,authorize,$state){
                                console.log("state :" + $state.params.filter + ", " + $stateParams.filter);
                                return appointmentFactory.getFilteredAppointments(authorize.getCentre()).get({appointmentId:parseInt($stateParams.id,10),filter:$stateParams.filter})
                            }]
                        }
                    }
                }
            })
            ;
            $urlRouterProvider.otherwise('/');
        })
;
