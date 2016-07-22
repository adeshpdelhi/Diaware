/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stockIssued', {
    centreId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stockIssuedId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    stockIssuedTo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estimatedTreatmentsNextDay: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    stockIssueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    stockTakerName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nextExpectedStockIssueDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'stockIssued'
  });
};
