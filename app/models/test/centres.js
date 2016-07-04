/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('centres', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maxPatients: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    accessLinesAvailable:{
      type:DataTypes.STRING(500),
      allowNull:true
    }
  }, {
    tableName: 'centres'
  });
};
