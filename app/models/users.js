/* jshint indent: 2 */
passportLocalSequelize = require('passport-local-sequelize');
var Sequelize = require('../../config/sequelize').Sequelize;
module.exports = function(sequelize, DataTypes) {
  var users= sequelize.define('users', {
            username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              is: /^[a-z0-9\_\-]+$/i,
            }
          },
          email: {
            type: Sequelize.STRING,
            validate: {
              isEmail: true
            }
          },
          hashedPassword: {
            type: Sequelize.STRING,
          },
          salt: {
            type: Sequelize.STRING
          }
  }, {
    tableName: 'users'
  });
//   passportLocalSequelize.attachToUser(users, {
//     usernameField: 'username',
//     hashField: 'hash',
//     saltField: 'salt'
// });
  return users;
};

