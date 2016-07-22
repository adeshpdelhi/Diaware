/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('indent', {
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
    itemsRaisedId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemsApprovedId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemsReceivedId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'indent'
  });
};
