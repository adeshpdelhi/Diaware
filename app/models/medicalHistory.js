/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicalHistory', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    doctorComments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'medicalHistory'
  });
};
