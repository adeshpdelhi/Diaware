'use strict';
angular.module('App')
    .controller('ViewBillController',['$scope','billFactory','patientFactory','$state','authorize', function($scope, billFactory, patientFactory,$state,authorize){
        $scope.bills = [];
        billFactory.getBills(authorize.getCentre()).query(function(response){
            $scope.bills = response;
        });
        $scope.redirect = function(id){
        	$state.go("app.billing.viewbill.details",{id:id});
        };
    }])
    .filter("dateFilter1", function() {
      return function(items, from, to) {
            // console.log("Date From and to UnParsed: " +from + ' ' + to);
            from = new Date(from);
            from.setHours(0,0,0,0,0);
            to = new Date(to);
            to.setHours(0,0,0,0,0);
            var df = Date.parse(from);
            var dt = Date.parse(to);
            var result = [];
            // console.log("DateFrom and to parsed:outside loop:" + df + '' + dt);  
            if(!items || !df || !dt) return items; 
            for (var i=0; i<items.length; i++){
                var d = new Date(items[i].createdAt);
                d.setHours(0,0,0,0,0);
                console.log(d +" "+ from + " " +to);
                var date = Date.parse(d);
                // console.log(d + "<-newDate: instance[i].date newDate parsed->"  + date );
                console.log(df + " " +date + ' ' + dt);
                if (date >= df && date <= dt)  {
                    result.push(items[i]);
                }
            }            
            return result;
      };
  })
;