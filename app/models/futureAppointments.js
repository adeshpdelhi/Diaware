/* jshint indent: 2 */
// next 1 week or 1 month auto added by eventscheduler-mysql
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('futureAppointments', {
    centreId:{
      type:DataTypes.STRING,
      allownull:true,
      references:{
        model:'centres',
        key:'id'
      }
    },
    shiftPatientsId:{
      type:DataTypes.INTEGER(11),
      allownull:false,
      references:{
        model:'shiftPatients',
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
      allownull:false
    },
    dayOfTheWeek:{
      type:DataTypes.STRING,
      allownull:true,
      validate:{
        isIn:[['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']]
      }
    },
    patientId:{
      type:DataTypes.STRING,
      allownull:true,
      references:{
        model:'patientDetails',
        key:'id'
      }
    },
    shiftNumber:{
      type:DataTypes.INTEGER(11),
      allownull:true
    },
    attended:{
      type:DataTypes.BOOLEAN,
      allownull:true,
      defaultValue: null
    },
    cancelled:{
      type:DataTypes.BOOLEAN,
      allownull:false,
      defaultValue:false
    }
  }, {
    tableName: 'futureAppointments',
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
  });
};
// muje lag rha hai ki umm ye table redundant hai ... saari appointments shift patients mein stoer ho skti hain
//nhi ...ye chahiye hoga coz ismein ek period ka stored hain appointments.... but umm column toh almost same hai :/
//refer karwa loon kya?
// baad mein sochte hain .... waise toh ye bhi theek hi lag rha hai ... yahi rehne dete hain phir
// a table for all future appointments and a table for past Attended appointments of maybe past 2-3 months ... usse zyada koi dekhega nhi kabhi :P



// sequelize.query("INSERT INTO attendedAppointments select * from futureAppointments where appointmentId = :id ;",{ replacements: { id: futureAppointment.appointmentId }}).spread(function(results, metadata) {
//   console.log(JSON.stringify(results));
//   sequelize.query("DELETE FROM futureAppointments where appointmentId = :id;",{replacements:{id:futureAppointment.appointmentId}}).spread(function(results1,metadata1){
//     console.log(JSON.stringify(results1));
//   }); 
// });