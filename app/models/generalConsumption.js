/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('generalConsumption', {
    centreId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    generalConsumptionId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'generalConsumption'
  });
};
