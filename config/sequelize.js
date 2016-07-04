var Sequelize = require("sequelize");
var config = require ('./config')
var sequelize = new Sequelize(config.sequelizeUrl);

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection to database has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });
db={};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 