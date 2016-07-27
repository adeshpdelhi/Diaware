'use strict';
angular.module('App')
.controller('MonitoringIntraController',['$scope','patientFactory','choosePatientFactory','authorize','monitoringChartFactory', function($scope, patientFactory, choosePatientFactory, authorize,monitoringChartFactory){
        $scope.intraInit = false;
        if(!$scope.view){      
            $scope.intraTable = [];
            $scope.intraInit = true;
        }
        if($scope.intraTable.length == 0){
          console.log("yooooooooooooooooooo");
          $scope.intraInit = true;  
        } 
		$scope.showalert_intradialysis=false;
        $scope.func = function(id){
            var intra = {
                patientId:$scope.view?$scope.patientChart.patientId:$scope.basic.id,
                intraId:$scope.view?$scope.patientChart.preBasicId:$scope.basic.preBasicId,
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
                lastModifiedBy:authorize.getUsername(),
                new:true
            };
            console.log("hhehehehe");
            console.log(intra.entryNumber);
            console.log(intra.intraId);
            $scope.intraTable.push(intra);
        };

        // $scope.$watch('intraTable[1].entryTime',function(newval,oldval){
        //     console.log(newval);
        // });
        $scope.saveIntra = function(){
            for(var i = 0;i< $scope.intraTable.length;i++){
                $scope.intraTable[i].patientId = $scope.basic.patientId;
                $scope.intraTable[i].intraId = $scope.basic.preBasicId;
                console.log($scope.intraTable[i]);
            }
    		monitoringChartFactory.getIntra($scope.basic.patientId).save($scope.intraTable).$promise.then(function(response){
			    $scope.showalert_intradialysis=true;
			    $scope.message="Saved Successfully!";
                $scope.messageColor = 'success'; 
            },function(response){
				$scope.showalert_intradialysis=false;
				console.log(response);
                $scope.message="Error: "+response.status + " " +response.statusText + "!";
                $scope.messageColor = 'danger';
			});

        };
        $scope.updateIntra = function(){
            $scope.updateIntra = true;
            var done =false;
            for(var i = 0; i < $scope.intraTable.length; i++ ){
                if($scope.intraTable[i].new) break;
                $scope.intraTable[i].lastModifiedBy = authorize.getUsername();
                console.log($scope.intraTable[i]);
                monitoringChartFactory.getIntra($scope.patientChart.patientId)
                .update({
                    intraId : $scope.intraTable[i].intraId, 
                    entryNumber : $scope.intraTable[i].entryNumber
                },$scope.intraTable[i])
                .$promise.then(function(response){
                    console.log(response);
                    $scope.updateParentValues(false,true,"Updated Successfully!",7,'success');
                },function(response){
                    $scope.updateParentValues(false,true,"Error: "+response.status + " " +response.statusText + "!",7,'danger');
                });
                done = true
            }
            if(done) return;
            for(var i = 0;i< $scope.intraTable.length;i++){
                $scope.intraTable[i].intraId = $scope.patientChart.preBasicId;
                $scope.intraTable[i].lastModifiedBy = authorize.getUsername();
                console.log($scope.intraTable[i]);
            }
            monitoringChartFactory.getIntra($scope.patientChart.patientId).save($scope.intraTable).$promise.then(function(response){
                $scope.updateParentValues(false,true,"Updated Successfully!",7,'success');
                console.log(response);
            },function(response){
                $scope.updateParentValues(false,true,"Error: "+response.status + " "+ response.statusText + "!",7,'danger');    
            });

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
