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
      primaryKey: true,
      autoIncrement: true
    },
    stockIssuedTo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estimatedSingleUse: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    estimatedReUse: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    estimatedNewDialyzer: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    estimatedCatheterSingleLumen: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    estimatedCatheterDoubleLumen: {
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
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'stockIssued'
  });
};
