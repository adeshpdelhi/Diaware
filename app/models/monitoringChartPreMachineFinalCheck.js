/* jshint indent: 2 */

var model = require('./monitoringChartPreBasic');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartPreMachineFinalCheck', {
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
    // preMachineFinalCheckId: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    machineNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true
      // validate:{  
      //     isSame:function(value){
      //       console.log(value);
      //       if(value!= ''.getDataValue('machineNumber'))
      //         throw new Error('Invalid machineNumber');
      //     }
      // }
    },
    machineTestPassed: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes','No']]
      }
    },
    machineTestCheckedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    airDetector: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes','No']]
      }
    },
    alarmLimits: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes','No']]
      }
    },
    dialysateFlowRate: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    dialysisCounterCurrentFlow: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes','No']]
      }
    },
    dialysateTemperature: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    conductivity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    partAConcentrationCombination: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'monitoringChartPreMachineFinalCheck'
  });
};
