/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dialysisCarePlan', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model:'patientDetails',
        key:'id'
      }
    },
    carePlanId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    prescriptionDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dryWeight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    dialysisDurationFirstTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    dialysisDurationRegular: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    BFR: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    DFR: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    UFR: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    heparinFree: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes','No']]
      }
    },
    heparinDosageBolus: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    heparinDosageHourly: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    dialysateType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dialysateTemperature: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    dialysateFrequencyPerWeek: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    accessUsed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'dialysisCarePlan'
  });
};
