/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dialysisItems', {
    itemId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references:{
        model: 'item',
        key: 'itemId'
      }
    }
  }, {
    tableName: 'dialysisItems'
  });
};
