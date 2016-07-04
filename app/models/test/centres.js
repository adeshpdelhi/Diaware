/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('centres', {
    centreId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    centreName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    centreLocation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    centreMaxPatients: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'centres'
  });
};
