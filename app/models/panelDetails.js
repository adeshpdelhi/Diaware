/* jshint indent: 2 */
var db = require('./');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('panelDetails', {
    patientId:{
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references:{
        model: 'patientDetails',
        key: 'id'
      }
    },
    panelId:{
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references:{
        model: 'panels',
        key: 'id'
      }
    },
    panelPermissionDateFrom: {
      type: DataTypes.DATE,
      allowNull: true
    },
	  panelPermissionDateTo: {
      type: DataTypes.DATE,
      allowNull: true
    },
    panelPermissionNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    totalTmtsPermitted: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    totalTmtsRemaining: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    renewalDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    active:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'panelDetails'
  });
};
