/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  var bills = sequelize.define('bills', {
    transactionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bedType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ledger: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'bills'
  });
  
  return bills;
};

