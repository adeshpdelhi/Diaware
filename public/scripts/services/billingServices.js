'use strict';
angular.module('App')
	// .constant("baseURL","https://localhost:3443/api/")
	.service('billFactory', ['$resource','baseURL' ,function($resource,baseURL){
    this.getBills = function(){
      return $resource(baseURL+"bills/:id",null,  {'update':{method:'PUT' }});
    };
    // this.updateBills = function(bill){
    //   console.log("in services.updateBills:"+ bill[0]);
    //   bills = bills.concat(bill);
    // };
    // this.addBill = function(bill){
    //   bills.push(bill);
    // };
  }])
;