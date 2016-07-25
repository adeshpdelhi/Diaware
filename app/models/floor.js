/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('floor', {
    centreId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    itemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references:{
        model: 'item',
        key: 'itemId'
      }
    },
    availableQuantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'floor'
  });
};
