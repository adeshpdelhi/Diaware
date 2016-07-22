/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('indentsItems', {
    indentItemsId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    itemNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
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
    quantityType: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'indentsItems'
  });
};
