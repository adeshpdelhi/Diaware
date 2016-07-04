/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('panels', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    panelName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    panelDetails: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'panels'
  });
};
