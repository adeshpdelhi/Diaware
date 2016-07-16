var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var dropDownRouter = express.Router({mergeParams:true});

dropDownRouter.use(bodyParser.json());


// can add route to fetch all patients dropDowns ie /api/dialyzateTypes ----------- naaaaaaah .... list of patients phir wahan se show careplan / panels/ other details monitoring charts etc etc
// or can add route to fetch list of patients under one dropDown usind route - /api/dropDowns/

dropDownRouter.route('/dialyzateTypes')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.dialyzateTypes.findAll().then(function(dialyzates){
    	console.log(JSON.stringify(dialyzates));
    	res.json(dialyzates);
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.dialyzateTypes.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    });
});

dropDownRouter.route('/dialyzateTypes/:dialyzateType')
.delete(function(req,res,next){
    db.dialyzateTypes.destroy({
        where:{dialyzateType:req.params.dialyzateType}
    }).then(function(result){
        res.json(result);
    })    
});


dropDownRouter.route('/transactionTypes')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.transactionTypes.findAll().then(function(transactions){
        console.log(JSON.stringify(transactions));
        res.json(transactions);
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.transactionTypes.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    });
});

dropDownRouter.route('/transactionTypes/:transactionType')
.delete(function(req,res,next){
    db.transactionTypes.destroy({
        where:{transactionType:req.params.transactionType}
    }).then(function(result){
        res.json(result);
    })    
});



dropDownRouter.route('/dialysisTypes')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.dialysisTypes.findAll().then(function(dialysiss){
        console.log(JSON.stringify(dialysiss));
        res.json(dialysiss);
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.dialysisTypes.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    });
});

dropDownRouter.route('/dialysisTypes/:dialysisType')
.delete(function(req,res,next){
    db.dialysisTypes.destroy({
        where:{dialysisType:req.params.dialysisType}
    }).then(function(result){
        res.json(result);
    })    
});

dropDownRouter.route('/consumableTypes')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.consumableTypes.findAll().then(function(consumables){
        console.log(JSON.stringify(consumables));
        res.json(consumables);
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.consumableTypes.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    });
});

dropDownRouter.route('/consumableTypes/:consumableType')
.delete(function(req,res,next){
    db.consumableTypes.destroy({
        where:{consumableType:req.params.consumableType}
    }).then(function(result){
        res.json(result);
    })    
});



dropDownRouter.route('/procedureTypes')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.procedureTypes.findAll().then(function(procedures){
        console.log(JSON.stringify(procedures));
        res.json(procedures);
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.procedureTypes.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    });
});

dropDownRouter.route('/procedureTypes/:procedureType')
.delete(function(req,res,next){
    db.procedureTypes.destroy({
        where:{procedureType:req.params.procedureType}
    }).then(function(result){
        res.json(result);
    })    
});


dropDownRouter.route('/pharmacyTypes')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.pharmacyTypes.findAll().then(function(pharmacies){
        console.log(JSON.stringify(pharmacies));
        res.json(pharmacies);
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.pharmacyTypes.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    });
});

dropDownRouter.route('/pharmacyTypes/:pharmacyType')
.delete(function(req,res,next){
    db.pharmacyTypes.destroy({
        where:{pharmacyType:req.params.pharmacyType}
    }).then(function(result){
        res.json(result);
    })    
});




dropDownRouter.route('/diseases')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.diseases.findAll().then(function(diseases){
        console.log(JSON.stringify(diseases));
        res.json(diseases);
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.diseases.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    });
});

dropDownRouter.route('/diseases/:diseaseName')
.delete(function(req,res,next){
    db.diseases.destroy({
        where:{diseaseName:req.params.diseaseName}
    }).then(function(result){
        res.json(result);
    })    
});



// dropDownRouter.route('/:dropDownId')
// .get(function(req,res,next){
//     console.log('procesing get');
//     db.dialyzateTypes.findOne({
//         where:{
//             dropDownId:parseInt(req.params.dropDownId,10),
//             patientId:req.params.id
//         }
//     }).then(function(dropDown){
//         console.log(JSON.stringify(dropDown));
//         res.json(dropDown);
//     });
// })
// .delete(function(req,res,next){

// })
// .put(function(req,res,next){
//     console.log(req.body);
//     db.dialyzateTypes.update(
//     req.body, {
//             where:{
//                 dropDownId:parseInt(req.params.dropDownId,10),
//                 patientId:req.params.id
//             }
//         }
//     )
//     .then(function (result) { 
//         console.log(JSON.stringify(result));
//         res.end("successfully updated")
//     }, function(rejectedPromiseError){
    
//     });
// })
// ;

module.exports = dropDownRouter;