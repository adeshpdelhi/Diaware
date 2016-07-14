/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
            username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              is: /^[a-z0-9\_\-]+$/i
            }
          },
          hashedPassword: {
            type: DataTypes.STRING
          },
          centres:{
            type:DataTypes.STRING(500),
            allowNull:true,
            get:function(){
              if(this.getDataValue('centres') != null)
                return this.getDataValue('centres').split(',');
              else return this.getDataValue('centres');
            },
            set:function(val){
              var value =val.split(',')[0], split=",";
              for(var i = 1; i< val.split(',').length;i++) 
                value = value.concat(split,val.split(',')[i]);
              this.setDataValue('centres',value);
            }
          },
          admin: {
            type: DataTypes.BOOLEAN
          },
          incharge: {
            type: DataTypes.BOOLEAN
          },
          manager: {
            type: DataTypes.BOOLEAN
          },
          clinical: {
            type: DataTypes.BOOLEAN
          }
          //add which centres he has authority of (',' separated list)
          /* use this code to get array of all the centers user has access to
              centre:{
                type:DataTypes.STRING(500),
                allowNull:true,
                get:function(){
                  if(this.getDataValue('centre') != null)
                    return this.getDataValue('centre').split(',');
                  else return this.getDataValue('centre');
                },
                set:function(val){
                  var value =val[0], split="/";
                  for(var i = 1; i< val.length;i++) 
                    value = value.concat(split,val[i]);
                  this.setDataValue('centre',value);
                }
          },
          */
          
          // add code to which modules he has access to like billing, clinical, 
          // ,admin (again can be a ',' separated list to be accessed the same way)

          // aur soch lena kya chahiye hoga..  i think this is what is required 
          
          // need to add UI for incharge for whatever extra he can do 

  }, {
    tableName: 'users'
  });
};

