/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consumption', {
    centreId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    treatementType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    treatementId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'consumption'
  });
};
