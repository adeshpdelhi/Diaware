/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vaccinationDetails', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dosage1: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dosage2: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dosage3: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dosage4: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'vaccinationDetails'
  });
};
