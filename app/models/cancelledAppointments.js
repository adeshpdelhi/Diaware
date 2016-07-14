/* jshint indent: 2 */
//of the past year maybe
// make a trigger to shift the appointment automatically once marked attended
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cancelledAppointments', {
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
      // default:false
      validate:{
        isTrue:function(value){
          if(!value){
            throw new Error('Only Attended appointments can be shifted here');
          }
        }
      },
      set:function(){
        this.setDataValue(attended,false);
      }
    }
  }, {
    tableName: 'cancelledAppointments'
  });
};
