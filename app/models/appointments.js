/* jshint indent: 2 */
// next 1 week or 1 month auto added by eventscheduler-mysql
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appointments', {
    centreId:{
      type:DataTypes.STRING,
      allownull:true,
      references:{
        model:'centres',
        key:'id'
      }
    },
    appointmentId:{
      type:DataTypes.INTEGER(11),
      allownull:false,
      primaryKey:true,
      autoIncrement:true
    },
    date:{
      type:DataTypes.DATEONLY,
      allownull:true
    },
    dayOfTheWeek:{
      type:DataTypes.STRING,
      allownull:true,
      validate:{
        isIn:[['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']]
      }
    },
    appointmentType:{
      type:DataTypes.STRING,
      allownull:true,
      validate:{
        isIn:[['','IPD/ICU','OPD']]
      }
    },
    tmtMachine:{
      type:DataTypes.STRING,
      allownull:true,
      validate:{
        isIn:[['','NegativeMachine','BPositiveMachine', 'CPositiveMachine','HIVMachine']]
      }
    },
    patientId:{
      type:DataTypes.STRING,
      allownull:false,
      references:{
        model:'patientDetails',
        key:'id'
      }
    },
    shiftNumber:{
      type:DataTypes.INTEGER(11),
      allownull:true
    },
    oneTimeAppointment:{
      type: DataTypes.BOOLEAN,
      allownull:true,
      defaultValue:false
    },

    present:{
      type:DataTypes.BOOLEAN,
      allownull:true
      // defaultValue: false
    },
    billingDone:{
      type:DataTypes.BOOLEAN,
      allownull:true,
      defaultValue: false
    },
    monitoringDone:{
      type:DataTypes.BOOLEAN,
      allownull:true,
      defaultValue: false
    },
    treatmentConsumptionAdded:{
      type:DataTypes.BOOLEAN,
      allownull:true,
      defaultValue: false
    },
    processComplete:{
      type:DataTypes.BOOLEAN,
      allownull:true,
      defaultValue: false
    },
    cancelled:{
      type:DataTypes.BOOLEAN,
      allownull:true,
      defaultValue:false
    }
  }, {
    tableName: 'appointments'
  });
};

// sequelize.query("INSERT INTO attendedAppointments select * from futureAppointments where appointmentId = :id ;",{ replacements: { id: futureAppointment.appointmentId }}).spread(function(results, metadata) {
//   console.log(JSON.stringify(results));
//   sequelize.query("DELETE FROM futureAppointments where appointmentId = :id;",{replacements:{id:futureAppointment.appointmentId}}).spread(function(results1,metadata1){
//     console.log(JSON.stringify(results1));
//   }); 
// });

/*

,
    hooks:{
      afterUpdate: function(futureAppointment){
        //create instance level update if possible else do this there in appointment router
        console.log("inside Hook");
        console.log(futureAppointment);
        if(futureAppointment.attended != null){
          //shift to attended appointments table
          console.log(JSON.parse(JSON.stringify(futureAppointment)));
          console.log("inside attended hook");
          sequelize.models.pastAppointments.build(JSON.parse(JSON.stringify(futureAppointment))).save().then(function(result){
            console.log(JSON.stringify(result));
            sequelize.models.futureAppointments.destroy({
              where:{
                appointmentId:futureAppointment.appointmentId
              }
            }).then(function(result){
              console.log(JSON.stringify(result));
            });
          });
          return;
        }
        if(futureAppointment.cancelled){
          // shift to cancelled appointments table if appointment cancelled
          console.log("inside cancelled");
          sequelize.models.cancelledAppointments.build(JSON.parse(JSON.stringify(futureAppointment))).save().then(function(result){
            console.log(JSON.stringify(result));
            sequelize.models.futureAppointments.destroy({
              where:{
                appointmentId:futureAppointment.appointmentId
              }
            }).then(function(result){
              console.log(JSON.stringify(result));
            });
          });
        }
      }
    }
*/
