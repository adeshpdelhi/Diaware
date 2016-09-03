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
//relations between bill and patient
// dbmodel.patientDetails.hasMany(dbmodel.bills,{foreignKey:'patientId'});
// dbmodel.bills.belongsTo(dbmodel.patientDetails, {foreignKey: 'patientId'});

dbmodel.patientDetails.hasMany(dbmodel.billMaster,{foreignKey:'patientId'});
dbmodel.billMaster.belongsTo(dbmodel.patientDetails, {foreignKey: 'patientId'});

dbmodel.billMaster.hasMany(dbmodel.bills,{foreignKey:'billId'});
dbmodel.bills.belongsTo(dbmodel.billMaster,{foreignKey:'billId'});

//relation between centre and patients - one centre has many patients
dbmodel.centres.hasMany(dbmodel.patientDetails,{foreignKey:'centreId'});
dbmodel.patientDetails.belongsTo(dbmodel.centres,{foreignKey:'centreId'});


/* 
   can store older panelDetails and OtherDetails in which case it would be 
   1-n relations b/w patientDetails n paneldetails ; patientDetails n otherDetails
*/
//relation between panels and panelDetails - #a single panel has many patients# 
dbmodel.panels.hasMany(dbmodel.panelDetails,{foreignKey:'panelId'});
dbmodel.panelDetails.belongsTo(dbmodel.panels,{foreignKey:'panelId'});
//and each patient has exactly one panelDetail
dbmodel.patientDetails.hasOne(dbmodel.panelDetails,{foreignKey:'patientId'});
dbmodel.panelDetails.belongsTo(dbmodel.patientDetails,{foreignKey:'patientId'});

//relation between patient and otherDetails
dbmodel.patientDetails.hasOne(dbmodel.otherDetails,{foreignKey:'patientId'});
dbmodel.otherDetails.belongsTo(dbmodel.patientDetails,{foreignKey:'patientId'});



//relation between patient and his medical history
dbmodel.patientDetails.hasMany(dbmodel.medicalHistory,{foreignKey:'patientId'});
dbmodel.medicalHistory.belongsTo(dbmodel.patientDetails,{foreignKey:'patientId'});

//relation between patient and clinical events
dbmodel.patientDetails.hasMany(dbmodel.majorClinicalEvents,{foreignKey:'patientId'});
dbmodel.majorClinicalEvents.belongsTo(dbmodel.patientDetails,{foreignKey:'patientId'});


dbmodel.dialysisCarePlan.belongsTo(dbmodel.patientDetails,{foreignKey:'patientId'});
dbmodel.patientDetails.hasMany(dbmodel.dialysisCarePlan,{foreignKey:'patientId'});

dbmodel.patientDetails.hasMany(dbmodel.monitoringChartPreBasic,{foreignKey:'patientId'});
dbmodel.monitoringChartPreBasic.belongsTo(dbmodel.patientDetails,{foreignKey:'patientId'});

dbmodel.monitoringChartPreBasic.hasOne(dbmodel.monitoringChartPreBasicMedical,{foreignKey:'preBasicId'});
dbmodel.monitoringChartPreBasic.hasOne(dbmodel.monitoringChartPreMachineFinalCheck,{foreignKey:'preBasicId'});
dbmodel.monitoringChartPreBasic.hasOne(dbmodel.monitoringChartPreAssessment,{foreignKey:'preBasicId'});
dbmodel.monitoringChartPreBasic.hasOne(dbmodel.monitoringChartPreAccessAssessment,{foreignKey:'preBasicId'});
dbmodel.monitoringChartPreBasic.hasMany(dbmodel.monitoringChartIntra,{foreignKey:'intraId'});
dbmodel.monitoringChartPreBasic.hasOne(dbmodel.monitoringChartPost,{foreignKey:'postId'});
dbmodel.monitoringChartPost.belongsTo(dbmodel.monitoringChartPreBasic,{foreignKey:'postId'});
//add the other half - not needed :P

dbmodel.patientDetails.hasMany(dbmodel.schedulePatients,{foreignKey:'patientId'});
dbmodel.schedulePatients.belongsTo(dbmodel.patientDetails,{foreignKey:'patientId'});

dbmodel.patientDetails.hasMany(dbmodel.appointments,{foreignKey:'patientId'});
dbmodel.appointments.belongsTo(dbmodel.patientDetails,{foreignKey:'patientId'});

dbmodel.appointments.belongsTo(dbmodel.centres,{foreignKey:'centreId'});
dbmodel.centres.hasMany(dbmodel.appointments,{foreignKey:'centreId'});



dbmodel.indent.hasMany(dbmodel.indentItems,{foreignKey:'indentId'});
dbmodel.indentItems.belongsTo(dbmodel.indent,{foreignKey:'indentId'});

dbmodel.item.hasOne(dbmodel.indentItems,{foreignKey:'itemId'});
dbmodel.indentItems.belongsTo(dbmodel.item,{foreignKey:'itemId'});

dbmodel.stockIssued.hasMany(dbmodel.stockIssuedItems,{foreignKey:'stockIssuedId'});
dbmodel.stockIssuedItems.belongsTo(dbmodel.stockIssued,{foreignKey:'stockIssuedId'});

dbmodel.consumption.hasMany(dbmodel.consumptionItems,{foreignKey:'treatmentId'});
dbmodel.consumptionItems.belongsTo(dbmodel.consumption,{foreignKey:'treatmentId'});

dbmodel.consumption.hasMany(dbmodel.consumptionItems,{foreignKey:'treatmentId'});
dbmodel.consumptionItems.belongsTo(dbmodel.consumption,{foreignKey:'treatmentId'});

dbmodel.item.hasOne(dbmodel.stock,{foreignKey:'itemId'});
dbmodel.stock.belongsTo(dbmodel.item,{foreignKey:'itemId'});

dbmodel.item.hasOne(dbmodel.floor,{foreignKey:'itemId'});
dbmodel.floor.belongsTo(dbmodel.item,{foreignKey:'itemId'});

dbmodel.item.hasOne(dbmodel.stockIssuedItems,{foreignKey:'itemId'});
dbmodel.stockIssuedItems.belongsTo(dbmodel.item,{foreignKey:'itemId'});

dbmodel.item.hasOne(dbmodel.dialysisItems,{foreignKey:'itemId'});
dbmodel.dialysisItems.belongsTo(dbmodel.item,{foreignKey:'itemId'});

dbmodel.item.hasOne(dbmodel.catheterizationItems,{foreignKey:'itemId'});
dbmodel.catheterizationItems.belongsTo(dbmodel.item,{foreignKey:'itemId'});

dbmodel.consumptionItems.belongsTo(dbmodel.item,{foreignKey:'itemId'});

dbmodel.generalConsumptionItems.belongsTo(dbmodel.item,{foreignKey:'itemId'});

module.exports = dbmodel;