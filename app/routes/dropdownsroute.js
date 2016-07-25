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
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
    
})
.post(function (req, res, next) {
	console.log('processing post : '+ req.body);
    db.dialyzateTypes.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
});

dropDownRouter.route('/dialyzateTypes/:dialyzateType')
.delete(function(req,res,next){
    db.dialyzateTypes.destroy({
        where:{dialyzateType:req.params.dialyzateType}
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    })    
});


dropDownRouter.route('/transactionTypes')
.get(function (req, res, next) {
    console.log('procesing get');
    db.transactionTypes.findAll().then(function(transactions){
        console.log(JSON.stringify(transactions));
        res.json(transactions);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.transactionTypes.build(req.body).save().then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
});

dropDownRouter.route('/transactionTypes/:transactionType')
.delete(function(req,res,next){
    db.transactionTypes.destroy({
        where:{transactionType:req.params.transactionType}
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    })    
});


dropDownRouter.route('/ledgers')
.get(function (req, res, next) {
    console.log('procesing get');
    db.ledgerTable.findAll().then(function(ledgers){
        console.log(JSON.stringify(ledgers));
        res.json(ledgers);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.ledgerTable.build(req.body).save().then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
})
;

dropDownRouter.route('/ledgers/:ledgerType')
.get(function(req,res,next){
    db.ledgerTable.findAll({
        where:{
            ledgerType:req.params.ledgerType
        }
    }).then(function(results){
        console.log(JSON.stringify(results));
        res.json(results);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
})
.delete(function(req,res,next){
    var where = {};
    if(req.query.ledgerName) where['ledgerName'] = req.query.ledgerName;
    if(req.query.id) where['id'] = parseInt(req.query.id,10);
    where['ledgerType'] = req.params.ledgerType;
    console.log(req.query);
    console.log(req.params);
    db.ledgerTable.destroy({
        where:where
    }).then(function(result){
        console.log(JSON.stringify(result));
        res.json(result);
    },function(rejectedPromiseError){
        console.log(rejectedPromiseError);
        res.status(500);
        res.end("Internal Server Server");
    });    
})
.put(function (req,res,next) {
    var where={};
    where['ledgerType'] = req.params.ledgerType;
    if(req.query.ledgerName) where['ledgerName']=req.query.ledgerName;
    if(req.query.cost) where['cost'] = parseFloat(req.query.cost);
    if(req.query.id) where['id'] = parseInt(req.query.id,10);
    db.ledgerTable.update(req.body,{
        where:where
    }).then(function (result) {
        res.status(200);
        res.end("Updated Successfully");
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    })
})
;



// dropDownRouter.route('/dialysisTypes')
// .get(function (req, res, next) {
    
//     console.log('procesing get');
//     db.dialysisTypes.findAll().then(function(dialysiss){
//         console.log(JSON.stringify(dialysiss));
//         res.json(dialysiss);
//     });
    
// })
// .post(function (req, res, next) {
//     console.log('processing post : '+ req.body);
//     db.dialysisTypes.build(req.body).save().then(function(result){
//         res.json(result);
//     // res.end('dropDownRouter working'); // send status code
//     });
// });

// dropDownRouter.route('/dialysisTypes/:dialysisType')
// .delete(function(req,res,next){
//     db.dialysisTypes.destroy({
//         where:{dialysisType:req.params.dialysisType}
//     }).then(function(result){
//         res.json(result);
//     })    
// });

// dropDownRouter.route('/consumableTypes')
// .get(function (req, res, next) {
    
//     console.log('procesing get');
//     db.consumableTypes.findAll().then(function(consumables){
//         console.log(JSON.stringify(consumables));
//         res.json(consumables);
//     });
    
// })
// .post(function (req, res, next) {
//     console.log('processing post : '+ req.body);
//     db.consumableTypes.build(req.body).save().then(function(result){
//         res.json(result);
//     // res.end('dropDownRouter working'); // send status code
//     });
// });

// dropDownRouter.route('/consumableTypes/:consumableType')
// .delete(function(req,res,next){
//     db.consumableTypes.destroy({
//         where:{consumableType:req.params.consumableType}
//     }).then(function(result){
//         res.json(result);
//     })    
// });



// dropDownRouter.route('/procedureTypes')
// .get(function (req, res, next) {
    
//     console.log('procesing get');
//     db.procedureTypes.findAll().then(function(procedures){
//         console.log(JSON.stringify(procedures));
//         res.json(procedures);
//     });
    
// })
// .post(function (req, res, next) {
//     console.log('processing post : '+ req.body);
//     db.procedureTypes.build(req.body).save().then(function(result){
//         res.json(result);
//     // res.end('dropDownRouter working'); // send status code
//     });
// });

// dropDownRouter.route('/procedureTypes/:procedureType')
// .delete(function(req,res,next){
//     db.procedureTypes.destroy({
//         where:{procedureType:req.params.procedureType}
//     }).then(function(result){
//         res.json(result);
//     })    
// });


// dropDownRouter.route('/pharmacyTypes')
// .get(function (req, res, next) {
    
//     console.log('procesing get');
//     db.pharmacyTypes.findAll().then(function(pharmacies){
//         console.log(JSON.stringify(pharmacies));
//         res.json(pharmacies);
//     });
    
// })
// .post(function (req, res, next) {
//     console.log('processing post : '+ req.body);
//     db.pharmacyTypes.build(req.body).save().then(function(result){
//         res.json(result);
//     // res.end('dropDownRouter working'); // send status code
//     });
// });

// dropDownRouter.route('/pharmacyTypes/:pharmacyType')
// .delete(function(req,res,next){
//     db.pharmacyTypes.destroy({
//         where:{pharmacyType:req.params.pharmacyType}
//     }).then(function(result){
//         res.json(result);
//     })    
// });




dropDownRouter.route('/diseases')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.diseases.findAll().then(function(diseases){
        console.log(JSON.stringify(diseases));
        res.json(diseases);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.diseases.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
});

dropDownRouter.route('/diseases/:diseaseName')
.delete(function(req,res,next){
    db.diseases.destroy({
        where:{diseaseName:req.params.diseaseName}
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    })    
});







dropDownRouter.route('/catheterizationItems')
.get(function (req, res, next) {
        
    console.log('procesing get');
    db.catheterizationItems.findAll().then(function(catheterizationItems){
        console.log(JSON.stringify(catheterizationItems));
        res.json(catheterizationItems);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.catheterizationItems.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
});

dropDownRouter.route('/catheterizationItems/:itemId')
.delete(function(req,res,next){
    db.catheterizationItems.destroy({
        where:{itemId:req.params.itemId}
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    })    
});


dropDownRouter.route('/dialysisItems')
.get(function (req, res, next) {
        
    console.log('procesing get');
    db.dialysisItems.findAll().then(function(dialysisItems){
        console.log(JSON.stringify(dialysisItems));
        res.json(dialysisItems);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
    
})
.post(function (req, res, next) {
    console.log('processing post : '+ req.body);
    db.dialysisItems.build(req.body).save().then(function(result){
        res.json(result);
    // res.end('dropDownRouter working'); // send status code
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    });
});

dropDownRouter.route('/dialysisItems/:itemId')
.delete(function(req,res,next){
    db.dialysisItems.destroy({
        where:{itemId:req.params.itemId}
    }).then(function(result){
        res.json(result);
    },function(rejectedPromiseError){
        res.status(500);
        res.end("Internal Server Error");
    })    
});













module.exports = dropDownRouter;