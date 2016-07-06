'use strict';
angular.module('App')
	// .constant("baseURL","https://localhost:3443/api/")
	.service('billFactory',function(){
    var bills =[];
    this.getBills = function(){
      console.log("in services.getBills: "+ bills[0]);
      return bills;
    };
    this.updateBills = function(bill){
      console.log("in services.updateBills:"+ bill[0]);
      bills = bills.concat(bill);
    };
    this.addBill = function(bill){
      bills.push(bill);
    };
  })
;