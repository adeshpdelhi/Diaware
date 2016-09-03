/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('centres', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maxPatients: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    accessLinesAvailable:{
      type:DataTypes.STRING(500),
      allowNull:true,
      get:function(){
        if(this.getDataValue('accessLinesAvailable') != null)
          return this.getDataValue('accessLinesAvailable').split(',');
        else return this.getDataValue('accessLinesAvailable');
      },
      set:function(val){
        var value =val[0], split=",";
        for(var i = 1; i< val.length;i++) 
          value = value.concat(split,val[i]);
        this.setDataValue('accessLinesAvailable',value);
      }
    },
    patientCount:{
      type:DataTypes.INTEGER(11),
      allowNull:true,
      defaultValue:1
    },
    noOfShiftsPerDay:{
      type:DataTypes.INTEGER(11),
      allowNull:false,
      default:3,
      validate:{
        min:1,
        max:6
      }
    },
    typesOfMachinesAvailable:{
      type:DataTypes.STRING,
      allownull:true,
      get:function(){
        if(this.getDataValue('typesOfMachinesAvailable') != null)
          return this.getDataValue('typesOfMachinesAvailable').split(',');
        else return this.getDataValue('typesOfMachinesAvailable');
      },
      set:function(val){
        var value =val[0], split=",";
        for(var i = 1; i< val.length;i++) 
          value = value.concat(split,val[i]);
        this.setDataValue('typesOfMachinesAvailable',value);
      }
    },
    OPDTotalNegativeMachines:{
      type:DataTypes.INTEGER(11),
      allownull:false,
      validate:{
        min:0
      }
    },
    OPDTotalCPositiveMachines:{
      type:DataTypes.INTEGER(11),
      allownull:true,
      validate:{
        min:0
      } 
    },
    OPDTotalBPositiveMachines:{
      type:DataTypes.INTEGER(11),
      allownull:true,
      validate:{
        min:0
      }
    },
    OPDTotalHIVMachines:{
      type:DataTypes.INTEGER(11),
      allownull:true,
      validate:{
        min:0
      }
    },
    // IPD_ICUTotalMachines:{
    //  type:DataTypes.INTEGER(11),
    //  allownull:true,
    //  validate:{
    //    min:0
    //  }
    // },
    IPD_ICUTotalNegativeMachines:{
      type:DataTypes.INTEGER(11),
      allownull:true,
      validate:{
        min:0
      }
    },
    IPD_ICUTotalCPositiveMachines:{
      type:DataTypes.INTEGER(11),
      allownull:true,
      validate:{
        min:0
      } 
    },
    IPD_ICUTotalBPositiveMachines:{
      type:DataTypes.INTEGER(11),
      allownull:true,
      validate:{
        min:0
      }
    },
    IPD_ICUTotalHIVMachines:{
      type:DataTypes.INTEGER(11),
      allownull:true,
      validate:{
        min:0
      }
    }
  }, {
    tableName: 'centres',
    hooks:{
      afterCreate:function(instance){
        console.log("inside centre after create HOOK!");
        console.log(JSON.parse(JSON.stringify(instance)));
        var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var shifts= [];
        var x = 0;
        /*
        var commonShift = {};
        for(var k = 0; k < instance.typesOfMachinesAvailable.length;k++){
          console.log('OPDAvailable'+instance.typesOfMachinesAvailable[k]);
          commonShift['OPDAvailable'+instance.typesOfMachinesAvailable[k]] = instance['OPDTotal'+instance.typesOfMachinesAvailable[k]];
          commonShift['IPD_ICUAvailable'+instance.typesOfMachinesAvailable[k]] = instance['IPD_ICUTotal'+instance.typesOfMachinesAvailable[k]];
        }*/
        for(var i = 0 ;i<weekday.length;i++){
          for(var j = 0; j < instance.noOfShiftsPerDay; j++){
            var shift = {};
            shift['id'] = instance.id + "-"+ weekday[i].substring(0,3) + "-"+(j+1);
            console.log("typesOfMachinesAvailable:" + instance.typesOfMachinesAvailable);
            for(var k = 0; k < instance.typesOfMachinesAvailable.length;k++){
              console.log('OPDAvailable'+instance.typesOfMachinesAvailable[k]);
              shift['OPDAvailable'+instance.typesOfMachinesAvailable[k]] = instance['OPDTotal'+instance.typesOfMachinesAvailable[k]];
              shift['IPD_ICUAvailable'+instance.typesOfMachinesAvailable[k]] = instance['IPD_ICUTotal'+instance.typesOfMachinesAvailable[k]];
            }
            shifts.push(shift);
            sequelize.models.shifts.build(shift).save().then(function(result){
              x++;
              console.log(JSON.stringify(result));
              console.log("x: "+ x);
              if(x == 7*instance.noOfShiftsPerDay){
                var weekDaySlots = [];
                var y = 0;
                for(var i = 0;i<weekday.length;i++){
                  var weekDaySlot = {};
                  weekDaySlot['centreId'] = instance.id;
                  weekDaySlot['dayOfTheWeek'] = weekday[i];
                  for(var j = 0;j < instance.noOfShiftsPerDay;j++){
                    weekDaySlot['shift'+(j+1)+"Id"] = instance.id + "-"+ weekday[i].substring(0,3) + "-"+(j+1);
                  }
                  weekDaySlots.push(weekDaySlot);
                  sequelize.models.weekDaySlots.build(weekDaySlot).save().then(function(result){
                    console.log(JSON.stringify(result));
                    y++;
                  },function(rejectedPromiseError){
                    console.log("Erorr Occured While saving weekDaySlots");
                    return;
                  })
                }
              }
            },function(rejectedPromiseError){
              console.log("Error Occured while saving Shift!");
              return;
            });
          }  
        }   
      }

    }
  });
};
