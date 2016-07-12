/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('centres', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maxPatients: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    accessLinesAvailable:{
      type:DataTypes.STRING(500),
      allowNull:true,
      get:function(){
        if(this.getDataValue('accessLinesAvailable') != null)
          return this.getDataValue('accessLinesAvailable').split(',');
        else return this.getDataValue('accessLinesAvailable');
      },
      set:function(val){
        var value =val[0], split="/";
        for(var i = 1; i< val.length;i++) 
          value = value.concat(split,val[i]);
        this.setDataValue('accessLinesAvailable',value);
      }
    },
    patientCount:{
      type:DataTypes.INTEGER(11),
      allowNull:true
    },
    noOfShiftsPerDay:{
      type:DataTypes.INTEGER(11),
      allowNull:false,
      default:3,
      validate:{
        min:1,
        max:6
      }
    }
  }, {
    tableName: 'centres'
  });
};
