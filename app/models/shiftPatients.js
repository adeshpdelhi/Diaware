/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shiftPatients', {
    shiftId:{
    	type:DataTypes.STRING,
    	allownull:false,
    	primaryKey:true,
    	references:{
    		model:'shifts',
    		key:'id'
    	}
    },
    //OPD/IPD/ICU
    appointmentType:{
    	type:DataTypes.STRING,
    	allownull:false,
    	primaryKey:true,
      validate:{
        isIn:[['','IPD/ICU','OPD']]
      }
    },
    tmtMachine:{
      type:DataTypes.STRING,
      allownull:false,
      primaryKey:true,
      validate:{
        isIn:[['','Negative Machine','B+ Machine', 'C+ Machine','HIV Machine']]
      }
    },
    patientId:{
      type:DataTypes.STRING,
      allownull:false,
      primaryKey:true,
      references:{
        model:'patientDetails',
        key:'id'
      }
    },
    shiftNumber:{
      type:DataTypes.INTEGER(11),
      allownull:true
    }
  }, {
    tableName: 'shiftPatients'
    // hooks:{
    //   afterCreate:function(){

    //   }
    // }
  });
};
