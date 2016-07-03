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
    bedType: {
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
      type: DataTypes.DECIMAL,
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
    tableName: 'costSheet'
  });
};
