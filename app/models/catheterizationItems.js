/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('catheterizationItems', {
    itemId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'catheterizationItems'
  });
};
