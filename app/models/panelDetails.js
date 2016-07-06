/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('panelDetails', {
    panelId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
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
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'panelDetails'
  });
};
