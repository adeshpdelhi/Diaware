'use strict';
angular.module('App')
	// .constant("baseURL","https://localhost:3443/api/")
	.service('billFactory', ['$resource','baseURL' ,function($resource,baseURL){
        // var bills = {};
        // $resource(baseURL+"bills/:id",null,  {'update':{method:'PUT' }}).query(function(resp){
        //     bills = resp;    
        // });
        this.getBills = function(centreId){
          return $resource(baseURL+":centreId/bills/:id",{centreId:centreId},  {'update':{method:'PUT' }});
        };
        // this.getBill = function(id){
        //     return bills[id];
        // }
    // this.updateBills = function(bill){
    //   console.log("in services.updateBills:"+ bill[0]);
    //   bills = bills.concat(bill);
    // };
    // this.addBill = function(bill){
    //   bills.push(bill);
    // };
  }])
;