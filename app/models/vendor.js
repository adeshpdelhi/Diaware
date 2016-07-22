/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vendor', {
    vendorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vendorName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vendorAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vendorTINNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vendorContactPerson: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vendorContactPersonNumver: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vendorIntroducedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vendorIntroducedByName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'vendor'
  });
};
