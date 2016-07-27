/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartPost', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model:'patientDetails',
        key:'id'
      }
    },
    postId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references:{
        model:'monitoringChartPreBasic',
        key:'preBasicId'
      }
    },
    postWeight: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    weightLoss: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    UFReading: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    BPSitting: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    BPStanding: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    temperature: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    pulse: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    symptomaticHypotension: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes','No']]
      }
    },
    prolongedBleeding: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes','No']]
      }
    },
    bruit: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes','No']]
      }
    },
    subjectiveStatement: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cardiacStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    respiratoryStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mentalStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ambulatoryStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    KtVAchieved: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    EPODosage: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    EPOGivenBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    EPOSupply: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['','Internal','External']]
      }
    },
    bloodTransfusion: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes','No']]
      }
    },
    numberOfUnits: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    bloodBankName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    concludedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    anyOtherComments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'monitoringChartPost'
  });
};
