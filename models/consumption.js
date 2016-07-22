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
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quanityType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'consumption'
  });
};
