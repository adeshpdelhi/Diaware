/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stockIssuedItems', {
    stockIssuedId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      references:{
        model: 'stockIssued',
        key: 'stockIssuedId'
      }
    },
    itemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      references:{
        model: 'item',
        key: 'itemId'
      }
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
    tableName: 'stockIssuedItems'
  });
};
