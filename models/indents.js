/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('indents', {
    centreId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    indentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    requestDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    requiredByDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    stockOrderTo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemsRaised: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemsApproved: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemsReceived: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'indents'
  });
};
