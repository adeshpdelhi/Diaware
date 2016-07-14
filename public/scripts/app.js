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
                        controller : 'ViewMonitoringController'
                    }
                }

            })
			
			.state('app.inventory', {
                url:'inventory/',
            })

            .state('app.inventory.inventory_identing', {
                url:'Inventory_Identing',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/inventoryIdenting.html',
                        controller  : 'InventoryIdentingController'        
                    }
                }

            })
			
			.state('app.inventory.issue_stock', {
                url:'Issue_Stock',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/issueStock.html',
                        controller  : 'IssueStockController'        
                    }
                }

            })
			
			.state('app.inventory.treatment_inventory', {
                url:'Treatment_Inventory_Consumption',
                views: {
                    'content@': {
                        templateUrl : 'views/inventory/treatmentInventory.html',
                        controller  : 'TreatmentInventoryController'        
                    }
                }

            })
			
			
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
                                return billFactory.getBills(authorize.getCentre()).get({id:parseInt($stateParams.id)})
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
            .state('app.appointment',{
                url:"appointment/",
                views:{
                    'content@':{
                        templateUrl:'views/appointments/appointment.html',
                        controller:'AppointmentController',
                        resolve:{
                            patient:['authorize','patientFactory','choosePatientFactory', function(authorize,patientFactory,choosePatientFactory){
                                return patientFactory.getPatients(authorize.getCentre()).get({id:choosePatientFactory.getChosenPatient().id});
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
