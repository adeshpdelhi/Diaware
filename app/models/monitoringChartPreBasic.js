/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartPreBasic', {
    patientId:{
      type:DataTypes.STRING,
      allowNull:false,
      references:{
        model:'patientDetails',
        key:'id'
      }
    },
    monitoringDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    preBasicId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    machineNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    bedNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    leadTechnicianName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prescribedDuration: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    // 24 hr format
    startTime: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        // len:5,
        isCorrectFormat: function(value){
          var times = value.split(':');
          if(!(parseInt(times[0]) <= 23 && parseInt(times[0]) >= 0) || !(parseInt(times[1]) < 60 && parseInt(times[1]) >= 0)) 
            throw new Error('Invalid Time format');
        }
      }
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        // len:5,
        isCorrectFormat: function(value){
          var times = value.split(':');
          if(!(parseInt(times[0]) <= 23 && parseInt(times[0]) >= 0) || !(parseInt(times[1]) < 60 && parseInt(times[1]) >= 0)) 
            throw new Error('Invalid Time format');
        }
      }
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'monitoringChartPreBasic'
  });
};
