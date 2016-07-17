/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ledgerTable', {
    id:{
      type:DataTypes.INTEGER(11),
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
    }, 
    ledgerType: {
      type: DataTypes.STRING,
      allowNull: false
      // primaryKey: true
    },
    ledgerName:{
    	type:DataTypes.STRING,
    	allowNull:false
    	// primaryKey:true
    },
    cost:{
    	type:DataTypes.DECIMAL(10,2),
    	allowNull:false,
    	primaryKey:true
    }
  }, {
    tableName: 'ledgerTable'
  });
};
