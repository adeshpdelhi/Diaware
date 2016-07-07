"use strict";

var fs        = require("fs");
var path      = require("path");

var env       = process.env.NODE_ENV || "development";
var db = require('../../config/sequelize');
//var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = db.sequelize;
var Sequelize = db.Sequelize;


var dbmodel = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    dbmodel[model.name] = model;
  });

Object.keys(dbmodel).forEach(function(modelName) {
  if ("associate" in dbmodel[modelName]) {
    dbmodel[modelName].associate(dbmodel);
  }
});

dbmodel.sequelize = db.sequelize;
dbmodel.Sequelize = db.Sequelize;
dbmodel.patientDetails.hasMany(dbmodel.bills,{foreignKey:'patientId'});
dbmodel.bills.belongsTo(dbmodel.patientDetails, {foreignKey: 'patientId'});

dbmodel.centres.hasMany(dbmodel.patientDetails,{foreignKey:'centreId'});
dbmodel.patientDetails.belongsTo(dbmodel.centres,{foreignKey:'centreId'});

dbmodel.panels.hasMany(dbmodel.panelDetails,{foreignKey:'panelId'});
dbmodel.panelDetails.belongsTo(dbmodel.panels,{foreignKey:'panelId'});

dbmodel.patientDetails.hasOne(dbmodel.panelDetails,{foreignKey:'patientId'});
dbmodel.panelDetails.belongsTo(dbmodel.patientDetails,{foreignKey:'patientId'});

module.exports = dbmodel;