/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('catheterizationItems', {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'catheterizationItems'
  });
};
