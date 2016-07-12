/* jshint indent: 2 */
var db = require('./');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicalHistory', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references:{
        model: 'patientDetails',
        key: 'id'
      }
    },
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: false,
      // defaultValue: '',
      primaryKey: true
    },
    diseasePresent:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        isIn:[['', 'Yes','No']]
      }
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
