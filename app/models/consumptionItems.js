/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consumptionItems', {
    treatementId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    itemId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'consumptionItems'
  });
};
