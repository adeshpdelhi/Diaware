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

  }, {
    tableName: 'users'
  });
};

