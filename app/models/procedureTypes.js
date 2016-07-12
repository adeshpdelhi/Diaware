/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('procedureTypes', {
    procedureType: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'procedureTypes'
  });
};
