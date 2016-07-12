/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartPreAccessAssessment', {
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
    // preAccessAssesmentId: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    bruit: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Good','Fair','Poor','Absent']]
      }
    },
    anyAbnormality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    signOfAccessInfection: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['','Yes','No']]
      }
    },
    cannulation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    centralLineStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['','NormalFlow', 'ReverseFlow']]
      }
    },
    commencedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    assistedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'monitoringChartPreAccessAssessment'
  });
};
