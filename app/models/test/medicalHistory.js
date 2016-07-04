/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicalHistory', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: 'patientDetails', 
      referencesKey: 'id'   
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
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'medicalHistory'
  });
};
