/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dialysisItems', {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'dialysisItems'
  });
};
