/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stock', {
    centreId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    itemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    availabilityQuantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'stock'
  });
};
