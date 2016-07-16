/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('panels', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
      // get:function(){
      //   return this.getDataValue('id').toString() + ":" +this.getDataValue('name');
      // },
      // set:function(value){
      //   var splits = value.split(':');
      //   this.setDataValue('id',parseInt(splits[0]));
      //   this.setDataValue('name',splits[1]);
      // }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true
    },
    discount:{
      type:DataTypes.DECIMAL(10,2),
      allowNull:true
    }
  }, {
    tableName: 'panels'
  });
};
