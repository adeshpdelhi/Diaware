/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
    itemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    usageType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantityMeasurementType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'item'
  });
};
