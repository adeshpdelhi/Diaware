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
          centre: {
            type: DataTypes.STRING
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
          */
          
          // add code to which modules he has access to like billing, clinical, 
          // ,admin (again can be a ',' separated list to be accessed the same way)

          // aur soch lena kya chahiye hoga..  i think this is what is required 
          
          // need to add UI for incharge for whatever extra he can do 

  }, {
    tableName: 'users'
  });
};

