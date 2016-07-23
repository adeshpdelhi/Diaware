/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('indentItems', {
    indentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    itemNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
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
    quantityRequired: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    availabilityQuantity: {
      type: DataTypes.INTEGER(11),
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
    tableName: 'indentItems'
  });
};
