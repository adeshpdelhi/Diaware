var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var monitoringChartRouter = express.Router({mergeParams:true});
monitoringChartRouter.use(bodyParser.json());

//registration
var preBasicRouter = require('./monitoring/prebasicroute');
monitoringChartRouter.use('/:id/pre/basic',preBasicRouter);
var preBasicMedicalRouter = require('./monitoring/prebasicmedicalroute');
monitoringChartRouter.use('/:id/pre/basicMedical',preBasicMedicalRouter);
var preMachineCheckRouter = require('./monitoring/premachinecheckroute');
monitoringChartRouter.use('/:id/pre/machineCheck', preMachineCheckRouter);
var preAssessmentRouter = require('./monitoring/preassessmentroute');
monitoringChartRouter.use('/:id/pre/assessment',preAssessmentRouter);
var preAccessAssessmentRouter = require('./monitoring/preaccessassessmentroute');
monitoringChartRouter.use('/:id/pre/accessAssessment',preAccessAssessmentRouter);
	
var postRouter = require('./monitoring/postroute');
monitoringChartRouter.use('/:id/post',postRouter);

var intraRouter = require('./monitoring/intraroute');
monitoringChartRouter.use('/:id/intra',intraRouter);

// monitoringChartRouter.route('/')
// .get(function (req, res, next) {
    
//     console.log('procesing get');
//     db.monitoringChartDetails.findAll().then(function(monitoringCharts){
//     	console.log(JSON.stringify(monitoringCharts));
//     	res.json(monitoringCharts);
//     });
    
// })
// .post(function (req, res, next) {
// 	console.log('processing post : '+ req.body);
//     db.monitoringChartDetails.build(req.body).save().then(function(result){
//         res.json(result);
//     // res.end('monitoringChartRouter working'); // send status code
//     });
// })
// .delete(function(req,res,next){
    
// });

// monitoringChartRouter.route('/:id')
// .get(function(req,res,next){
//     console.log('procesing get');
//     db.monitoringChartDetails.findOne({where:{id:req.params.id}}).then(function(monitoringChart){
//         console.log(JSON.stringify(monitoringChart));
//         res.json(monitoringChart);
//     });
// })
// .delete(function(req,res,next){

// })
// .put(function(req,res,next){

// })
// ;

// // monitoringChartRouter.route('/:id/panelDetails/:panelId')
// // .get(function(req,res,next){
// //     console.log('procesing get');
// //     console.log(parseInt(req.params.panelId,10));
// //     console.log(req.params.id);
// //     db.panelDetails.findOne({
// //         where:{
// //             panelId:parseInt(req.params.panelId,10),
// //             monitoringChartId:req.params.id
// //         }
// //     }).then(function(panel){
// //         res.json(req.params);
// //         console.log(JSON.stringify(panel));
// //         // res.json(panel);
// //     });
// // });

module.exports = monitoringChartRouter;