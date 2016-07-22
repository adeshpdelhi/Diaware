/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stockIssuedItems', {
    stockIssuedId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    itemNumber: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false
    },
    itemId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    quantityMeasurementType: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'stockIssuedItems'
  });
};
