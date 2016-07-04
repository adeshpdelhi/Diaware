var Patient = require('./patientDetails');
var Center = require('./centers');
var Vaccination = require('./vaccinationDetails');
var PatientPanel = require('./panelDetails');
var Panels = require('./panels');
var OtherDetails = require('./otherDetails');
var PreCharts = require('./monitoringChartPre');
var PostChart = require('./monitoringChartPost');
var IntraChart= require('./monitoringChartIntra');
var CarePlan = require('./dialysisCarePlan');
// var patientDetials = require('./patientDetials');
// var patientDetials = require('./patientDetials');


// Patient.belongsTo(Center);
Center.hasMany(Patient,{as:'Patients'});
Patient.hasMany(Vaccination,{as:'Vaccinations'});
Patient.hasOne(PatientPanel);
// PatientPanel.belongsTo(Panels); // or use belongs to many ....it should be a panel belongs to many patients
Panels.belongsToMany(Patient,{through: PatientPanel});
Patient.hasOne(OtherDetails);
Patient.hasMany(PreCharts,{as:'PreCharts'});
Patient.hasMany(PostChart,{as:'PostChart'});
// add relation between pre post anc intra using patiend id and monitoringDate as other keys
Patient.hasMany(IntraChart,{as:'IntraChart'});
Patient.hasMany(CarePlan,{as:'CarePlans'});
