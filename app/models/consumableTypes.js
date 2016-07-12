/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consumableTypes', {
    consumableType: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'consumableTypes'
  });
};
