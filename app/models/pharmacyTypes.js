/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pharmacyTypes', {
    pharmacyType: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'pharmacyTypes'
  });
};
