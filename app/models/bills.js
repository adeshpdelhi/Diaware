/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  var bills = sequelize.define('bills', {
    billId:{
      type:DataTypes.INTEGER(11),
      allowNull:false,
      primaryKey:true,
      references:{
        model:'billMaster',
        key:'billId'
      }
    },
    transactionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
      // autoIncrement: true
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
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    tableName: 'bills'
  });
  
  return bills;
};

