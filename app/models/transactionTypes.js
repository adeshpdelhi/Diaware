/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactionTypes', {
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'transactionTypes'
  });
};
