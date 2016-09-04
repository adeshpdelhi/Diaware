/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  var bills = sequelize.define('billMaster', {
    billId:{
      type:DataTypes.INTEGER(11),
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    appointmentId:{
      type:DataTypes.INTEGER(11),
      allowNull:false,
      references:{
        model:'appointments',
        key:'appointmentId'
      }
    },
    appointmentDate:{
      type:DataTypes.DATEONLY,
      allowNull:true
    },
    appointmentType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    modeOfPayment:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        isIn:[['','cash','cashless']]
      }
    },
    panelId:{
      type:DataTypes.INTEGER(11),
      allowNull:true
    },
    additionalDiscount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn:[['','Pending','FullPaid','PartialPaid','Due']]
      }
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    payableAmount:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:false
    },
    patientPayableAmount:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:false
    },
    amountPending:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:false
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'billMaster',
    paranoid:true
  });
  
  return bills;
};

