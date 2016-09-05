var express = require('express');
var bodyParser = require('body-parser');

var db = require('../models');

var centreRouter = express.Router();
centreRouter.use(bodyParser.json());

centreRouter.route('/')
.get(function (req, res, next) {
    
    console.log('procesing get');
    db.centres.findAll().then(function(centres){
    	console.log(JSON.stringify(centres));
    	res.json(centres);
    });
    
})
.post(function (req, res, next) {
    var savedResult = {};
    db.centres.build(req.body).save().then(function(result){
        console.log(JSON.stringify(result));
        savedResult = JSON.parse(JSON.stringify(result));
        // res.json(result);
        db.users.findAll({
            where:{
                admin:true
            }
        }).then(function(admins){
            console.log(admins);
            for(var i=0;i<admins.length;i++){
                if(admins[i].centres.length>0)
                    admins[i].centres=admins[i].centres.concat(req.body.id);
                else
                    admins[i].centres = [req.body.id];
                 admins[i].save({fields: ['centres']});
            }
            res.json(savedResult);
        },function(rejectedPromiseError){
            res.status(400);
            res.end("Saved Center but Couldnt add the center to admins access. Contact developers!");
        });
    },function(rejectedPromiseError){
        res.status(400);
        res.end("Couldnt Add Center. Something Went Wrong!");
    });
    
})
.delete(function(req,res,next){
    
});

var updateIncreaseShifts = function(weekday,newInstance,oldInstance){
    var increase = newInstance.noOfShiftsPerDay - oldInstance.noOfShiftsPerDay;
    console.log("increase in shifts!" + increase);
    var x = 0; 
    for(var j = oldInstance.noOfShiftsPerDay; j < newInstance.noOfShiftsPerDay; j++){
        var shift = {};
        shift['id'] = newInstance.id + "-"+ weekday.substring(0,3) + "-"+(j+1);
        console.log("typesOfMachinesAvailable:" + newInstance.typesOfMachinesAvailable);
        for(var k = 0; k < newInstance.typesOfMachinesAvailable.length;k++){
            console.log('OPDAvailable'+newInstance.typesOfMachinesAvailable[k]);
            shift['OPDAvailable'+newInstance.typesOfMachinesAvailable[k]] = newInstance['OPDTotal'+newInstance.typesOfMachinesAvailable[k]];
            shift['IPD_ICUAvailable'+newInstance.typesOfMachinesAvailable[k]] = newInstance['IPD_ICUTotal'+newInstance.typesOfMachinesAvailable[k]];
        }
        // shifts.push(shift);
        db.shifts.build(shift).save().then(function(result){
            x++;
            console.log(JSON.stringify(result));
            console.log("x: "+ x);
            if(x == increase){
                var weekDaySlot = {};
                weekDaySlot['centreId'] = newInstance.id;
                weekDaySlot['dayOfTheWeek'] = weekday;
                for(var j = 0;j < newInstance.noOfShiftsPerDay;j++){
                    weekDaySlot['shift'+(j+1)+"Id"] = newInstance.id + "-"+ weekday.substring(0,3) + "-"+(j+1);
                }
                db.weekDaySlots.update(weekDaySlot,{
                    where:{
                        centreId:weekDaySlot.centreId,
                        dayOfTheWeek:weekDaySlot.dayOfTheWeek
                    }
                }).then(function(result){
                    console.log(JSON.stringify(result));
                },function(rejectedPromiseError){
                    console.log("Erorr Occured While updating weekDaySlots");
                    return;
                });
            }
        },function(rejectedPromiseError){
            console.log("Error Occured while saving new Shift!");
            return;
        });
    }  

};

var captureIncrease = function(newInstance,oldInstance){
    var shiftIncrease = {};
    for(var i = 0 ; i < newInstance.typesOfMachinesAvailable.length;i++){
        if(i >= oldInstance.typesOfMachinesAvailable.length){
            shiftIncrease['OPDAvailable'+newInstance.typesOfMachinesAvailable[i]] = newInstance['OPDTotal'+newInstance.typesOfMachinesAvailable[i]];
            shiftIncrease['IPD_ICUAvailable'+newInstance.typesOfMachinesAvailable[i]] = newInstance['IPD_ICUTotal'+newInstance.typesOfMachinesAvailable[i]];
        }
        else{
            console.log(newInstance.typesOfMachinesAvailable[i] + " , in old: " + oldInstance.typesOfMachinesAvailable[i])
            shiftIncrease['OPDAvailable'+newInstance.typesOfMachinesAvailable[i]] = (newInstance['OPDTotal'+newInstance.typesOfMachinesAvailable[i]] - (!oldInstance['OPDTotal'+newInstance.typesOfMachinesAvailable[i]]?0:oldInstance['OPDTotal'+newInstance.typesOfMachinesAvailable[i]]));
            shiftIncrease['IPD_ICUAvailable'+newInstance.typesOfMachinesAvailable[i]] = (newInstance['IPD_ICUTotal'+newInstance.typesOfMachinesAvailable[i]] - (!oldInstance['IPD_ICUTotal'+newInstance.typesOfMachinesAvailable[i]]?0:oldInstance['IPD_ICUTotal'+newInstance.typesOfMachinesAvailable[i]]));
        }
    }
    console.log("increase Value:");
    console.log(shiftIncrease);
    return shiftIncrease;
};  
var afterUpdate = function(newInstance, oldInstance){
    console.log("inside afterUpdate!");
    var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var increase = captureIncrease(newInstance,oldInstance);
    console.log(newInstance);
    console.log(oldInstance);
    for(var i = 0 ;i<weekday.length;i++){
        for(var j = 0; j < newInstance.noOfShiftsPerDay; j++){
            if(j >= oldInstance.noOfShiftsPerDay){
                updateIncreaseShifts(weekday[i],newInstance,oldInstance);
                console.log("increased");
                break;
            }
            console.log("finding shift with id: " + (newInstance.id + "-" + weekday[i].substring(0,3)+"-"+(j+1)) );
            db.shifts.find({
                where:{
                    id:(newInstance.id + "-" + weekday[i].substring(0,3)+"-"+(j+1))
                }
            }).then(function(result){
                var update = JSON.parse(JSON.stringify(result));
                console.log("to be updated!");
                console.log("to be increased by=:");
                console.log(increase);
                console.log(JSON.stringify(result));
                console.log(update);    
                if (result) { // if the record exists in the db
                    for(key in increase){
                        console.log(update);
                        if(!update[key]){
                            console.log('update[key] :' + update[key] + ", update.key" + update.key+  ", increase.key: " +  increase.key + ", increase[key]" + increase[key]);
                            update[key] = increase[key];
                            console.log('updated value key1:' +key + " , value: " + update[key]);
                        } 
                        else{
                            console.log('update[key] :' + update[key] + ", update.key" + update.key+  ", increase.key: " +  increase.key + ", increase[key]" + increase[key]);
                            update[key] = (update[key] + increase[key]);
                            console.log('updated value key2:' +key + " , value: " + update[key]);
                        }
                    }
                    console.log("original!");
                    console.log(JSON.stringify(result));
                    console.log('updated!')
                    console.log(update);
                    result.updateAttributes(update).then(function (updateResult) { 
                        console.log(JSON.stringify(updateResult));
                        // res.status(200);
                        // res.end("successfully updated");
                        console.log('updated successfully');
                    }, function(rejectedPromiseError){
                        // res.status(400);
                        // res.end('error');
                        console.log('cannot update: '+rejectedPromiseError);
                    });
                }
            },function(rejectedPromiseError){
                console.log("Error while updating old shifts on update of centre");
            })
            
        }
    }    
};

centreRouter.route('/:id')
.get(function(req,res,next){
    console.log('procesing get');
    db.centres.findOne({where:{id:req.params.id}}).then(function(centre){
        console.log(JSON.stringify(centre));
        res.json(centre);
    });
})
.delete(function(req,res,next){

})
.put(function(req,res,next){
    console.log(req.body);
    var newInstance = req.body;
    if(req.query.updateCount){
        db.centres.update(
        req.body, {
            where:{
                id:req.params.id
            }
        }).then(function (result) { 
            console.log(JSON.stringify(result));
            res.end("successfully updated")
        }, function(rejectedPromiseError){
            res.status(400);
            res.end("Problem Occured in centre Route update")
        });
        return; 
    }
    db.centres.find({ 
        where: {
            id:req.params.id
        } 
    }).then(function(oldCentre){
        var oldInstance = JSON.parse(JSON.stringify(oldCentre));
        if (oldCentre.id) { // if the record exists in the db
            oldCentre.updateAttributes(req.body).then(function (result) { 
                console.log(JSON.stringify(result));
                // afterUpdate(newInstance,oldInstance);
                res.status(200);
                res.end("successfully updated");
                console.log('updated successfully');
            }, function(rejectedPromiseError){
                res.status(400);
                res.end('error');
                console.log('cannot update: '+rejectedPromiseError);
            });
        }
    });
    
})
;

module.exports = centreRouter;