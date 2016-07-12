'use strict';
angular.module('App')
.controller('AppointmentController',['$scope','patient' ,function($scope,patient){
	$scope.patient = patient;
	$scope.data = false;
	$scope.appointmentTypes = ['OPD_Negative','OPD_B+','OPD_C+','OPD_HIV','ICU/IPD_Negative','ICU/IPD_B+','ICU/IPD_C+','ICU/IPD_HIV']
	$scope.options = ['Monday-Thursday','Monday-Wednesday','Tuesday-Friday'];
	$scope.daysData = {
		Monday:[
			{
				shift1:{
				OPD_slots_available:3	
				}
			},
			{
				shift3:{
				OPD_slots_available:5	
				}
			}
		],
		Tuesday:[
			{
				shift1:{
					OPD_slots_available:3
				}
			}		
		]
	};
}])

;