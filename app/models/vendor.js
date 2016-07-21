/* jshint indent: 2 */
var db = require('./');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vendor', {
    vendorId: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
     
    },
    vendorName: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true
    },
	
	vendorAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      
    },
    vendorTINNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      // defaultValue: '',
      primaryKey: true
    },
    vendorContactPerson:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    vendorContactPersonNumber: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    vendorIntroducedBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
	vendorIntroducedByName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'vendor'
  });
};
