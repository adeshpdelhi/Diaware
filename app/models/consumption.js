/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consumption', {
    centreId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    treatmentType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    treatmentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'consumption'
  });
};
