/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('costSheet', {
    centreId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    appointmentType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    panelName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ledgerType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ledgerName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cost: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'costSheet'
  });
};
