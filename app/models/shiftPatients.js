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
    slot:{
    	type:DataTypes.STRING,
    	allownull:false,
    	primaryKey:true
    },
    patientId:{
      type:DataTypes.STRING,
      allownull:false,
      references:{
        model:'patientDetails',
        key:'id'
      }
    }
  }, {
    tableName: 'shiftPatients'
  });
};
