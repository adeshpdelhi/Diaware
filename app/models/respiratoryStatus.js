/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('respiratoryStatus', {
    respiratoryStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'respiratoryStatus'
  });
};
