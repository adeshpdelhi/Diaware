/* jshint indent: 2 */
// next 1 week or 1 month auto added by eventscheduler-mysql
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('futureAppointments', {
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
    shiftNumber:{
      type:DataTypes.INTEGER(11),
      allownull:true
    },
    patientId:{
      type:DataTypes.STRING,
      allownull:true,
      reference:{
        model:'patientId',
        key:'id'
      }
    },
    attended:{
      type:DataTypes.BOOLEAN,
      allownull:true,
      default:false
    }

  }, {
    tableName: 'futureAppointments'
    // hooks:{
    //   afterUpdate:function(futureAppointment){
    //     if(futureAppointment.attended){
    //       //shift to attended appointments table
    //       sequelize.query("INSERT INTO attendedAppointments select * from futureAppointments where appointmentId = :id ;",{ replacements: { id: futureAppointment.appointmentId }}).spread(function(results, metadata) {
    //         console.log(JSON.stringify(results));
    //         sequelize.query("DELETE FROM futureAppointments where appointmentId = :id;",{replacements:{id:futureAppointment.appointmentId}}).spread(function(results1,metadata1){
    //           console.log(JSON.stringify(results1));
    //         }); 
    //       });
    //     }
    //   }
    // }
  });
};
// muje lag rha hai ki umm ye table redundant hai ... saari appointments shift patients mein stoer ho skti hain
//nhi ...ye chahiye hoga coz ismein ek period ka stored hain appointments.... but umm column toh almost same hai :/
//refer karwa loon kya?
// baad mein sochte hain .... waise toh ye bhi theek hi lag rha hai ... yahi rehne dete hain phir
// a table for all future appointments and a table for past Attended appointments of maybe past 2-3 months ... usse zyada koi dekhega nhi kabhi :P

