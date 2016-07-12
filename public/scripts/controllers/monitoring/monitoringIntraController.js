'use strict';
angular.module('App')
.controller('MonitoringIntraController',['$scope','patientFactory','choosePatientFactory','authorize','monitoringChartFactory', function($scope, patientFactory, choosePatientFactory, authorize,monitoringChartFactory){
        $scope.intraTable = [];
        $scope.func = function(id){
            var intra = {
                patientId:$scope.patient.id,
                intraId:$scope.basic.preBasicId,
                entryNumber:id,
                entryTime:null,
                bp:null,
                pr:null,
                ap:null,
                vp:null,
                tmp:null,
                ufr:null,
                totalUF:null,
                bfr:null,
                ebf:null,
                remarks:null,
                lastModifiedBy:authorize.getUsername()
            };
            console.log(intra.intraId);
            $scope.intraTable.push(intra);
        };

        $scope.$watch('intraTable[1].entryTime',function(newval,oldval){
            console.log(newval);
        });
        $scope.saveIntra = function(){
            for(var i = 0;i< $scope.intraTable.length;i++){
                $scope.intraTable[i].intraId = $scope.basic.preBasicId;
                console.log($scope.intraTable[i]);
            }
    		monitoringChartFactory.getIntra($scope.patient.id).save($scope.intraTable);
        };

    }])
    .directive("contenteditable", function() {
      return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {

          function read() {
            ngModel.$setViewValue(element.html());
          }

          ngModel.$render = function() {
            element.html(ngModel.$viewValue || "");
          };

          element.bind("blur keyup change", function() {
            scope.$apply(read);
          });
        }
      };
    })
    // directive('numbersOnly', function () {
    //     return {
    //         restrict:"A",
    //         require: 'ngModel',
    //         link: function (scope, element, attr, ngModelCtrl) {
    //             function fromUser(text) {
    //                 if (text) {
    //                     var transformedInput = text.replace(/[^0-9]/g, '');

    //                     if (transformedInput !== text) {
    //                         ngModelCtrl.$setViewValue(transformedInput);
    //                         ngModelCtrl.$render();
    //                     }
    //                     return transformedInput;
    //                 }
    //                 return undefined;
    //             }            
    //             ngModelCtrl.$parsers.push(fromUser);
    //         }
    //     };
    // })
    .directive('validNumber', function() {
      return {
        restrict:"A",
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
            return; 
          }

          ngModelCtrl.$parsers.push(function(val) {
            if (angular.isUndefined(val)) {
                var val = '';
            }
            
            var clean = val.replace(/[^-0-9\.]/g, '');
            var negativeCheck = clean.split('-');
            var decimalCheck = clean.split('.');
            if(!angular.isUndefined(negativeCheck[1])) {
                negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                clean =negativeCheck[0] + '-' + negativeCheck[1];
                if(negativeCheck[0].length > 0) {
                    clean =negativeCheck[0];
                }
                
            }
              
            if(!angular.isUndefined(decimalCheck[1])) {
                decimalCheck[1] = decimalCheck[1].slice(0,2);
                clean =decimalCheck[0] + '.' + decimalCheck[1];
            }

            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });

          element.bind('keypress', function(event) {
            if(event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
    })
;
