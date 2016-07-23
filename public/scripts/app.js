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
                        templateUrl : 'views/home.html'           
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
                url:'new',
                views: {
                    'content@': {
                        // templateUrl : 'views/monitoring/newmonitoringchart.html',
                        templateUrl : 'views/monitoring/newmonitoringchart.html',
                        controller : 'MonitoringController'
                    }
                }

            })

            .state('app.monitoring.view', {
                url:'view',
                views: {
                    'content@': {
                        templateUrl : 'views/monitoring/ViewMonitoringChart/viewmonitoringchart.html',
                        controller : 'ViewMonitoringController',
                        resolve:{
                            chosenPatientId:['choosePatientFactory', function(choosePatientFactory){
                                return choosePatientFactory.getChosenPatient().id;
                            }]
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








            .state('app.inventory.new_inventory_identing', {
                url:'Inventory_Identing/new',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/inventoryIdenting.html',
                        controller  : 'InventoryIdentingController'        
                    }
                }

            })
			
			.state('app.inventory.new_stock_received', {
                url:'Stock_Received/new',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/stockReceived.html',
                        controller  : 'StockReceivedController'        
                    }
                }

            })
			
			.state('app.inventory.new_issue_stock', {
                url:'Issue_Stock/new',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/issueStock.html',
                        controller  : 'IssueStockController'        
                    }
                }

            })
			
			.state('app.inventory.new_treatment_inventory', {
                url:'Treatment_Inventory_Consumption/new',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/treatmentInventory.html',
                        controller  : 'TreatmentInventoryController'        
                    }
                }

            })
			
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
			
			.state('app.inventory.view_inventory_identing', {
                url:'Inventory_Identing/view',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/ViewInventory/viewInventoryIdenting.html',
                        controller  : 'ViewInventoryIdentingController'        
                    }
                }

            })
			
			.state('app.inventory.view_stock_received', {
                url:'Stock_Received/view',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/ViewInventory/viewStockReceived.html',
                        controller  : 'ViewStockReceivedController'        
                    }
                }

            })
			
			.state('app.inventory.view_issue_stock', {
                url:'Issue_Stock/view',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/ViewInventory/viewIssueStock.html',
                        controller  : 'ViewIssueStockController'        
                    }
                }

            })
			
			.state('app.inventory.view_treatment_inventory', {
                url:'Treatment_Inventory_Consumption/view',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/ViewInventory/viewTreatmentInventory.html',
                        controller  : 'ViewTreatmentInventoryController'        
                    }
                }

            })
			
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
                url:"admin/",
                views:{
                    'content@':{
                        template:'views/admin/editDataBase.html',
                    }
                }
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
                        templateUrl:'views/admin/addCentre.html',
                        controller:'AddCentreController'
                    }
                }
            })
			
			.state('app.admin.dashboard',{
                url:"dashboard",
                views:{
                    'content@':{
                        templateUrl:'views/admin/dashboard.html',
                        controller:'DashboardController'
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
                url:"viewAppointments",
                views:{
                    'content@':{
                        templateUrl:'views/appointments/viewAppointment.html',
                        controller:'ViewAppointmentsController'
                    }
                }
            })
            ;
            $urlRouterProvider.otherwise('/');
        })
;
