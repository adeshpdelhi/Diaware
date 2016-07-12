/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartPreBasicMedical', {
    patientId:{
      type:DataTypes.STRING,
      allowNull:false,
      references:{
        model:'patientDetails',
        key:'id'
      }
    },
    preBasicId:{
      type:DataTypes.BIGINT,
      allowNull: false,
      primaryKey:true,
      references:{
        model:'monitoringChartPreBasic',
        key:'preBasicId'
      }
    },
    // preBasicMedicalId: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    dialyzerName:{
      type:DataTypes.STRING,
      allowNull:true
    },
    dialyzerType:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        isIn:[['Reuse','SingleUse']]
      }
    },    
    accessUsed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    centralLineCreated: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes', 'No']]
      }
    },
    centralLine: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        ifCentralLineCreated:function(value){
          if(value == null) 
            throw new Error('DataInconsistency: centralLineCreated = true, centralLine value cannot be null');
        }
      }
    },
    anticoagulant: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes', 'No']]
      }
    },
    bolusAmount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    hourlyHeparin: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //time input in HH:MM 24 hr format
    heparinStopBefore: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        len:5,
        isCorrectFormat: function(value){
          var times = value.split(':');
          if(!(parseInt(times[0]) <= 23 && parseInt(times[0]) >= 0) || !(parseInt(times[1]) < 60 && parseInt(times[1]) >= 0)) 
            throw new Error('Invalid Time format');
        }
      }
    },
    NSFlushingFrequency: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    NSFlushingVolume: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
   lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'monitoringChartPreBasicMedical'
  });
};
