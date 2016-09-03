/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schedulePatients', {
    centreId:{
      type:DataTypes.STRING,
      allownull:true,
      references:{
        model:'centres',
        key:'id'
      }
    },
    id:{
      type:DataTypes.INTEGER(11),
      allownull:false,
      primaryKey:true,
      autoIncrement:true
    },
    patientId:{
      type:DataTypes.STRING,
      allownull:false,
      // primaryKey:true,
      references:{
        model:'patientDetails',
        key:'id'
      }
    },
    day:{
      type:DataTypes.STRING,
      allownull:false,
      validate:{
        isIn:[['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']]
      } 
    },
    shiftNumber:{
      type:DataTypes.INTEGER(11),
      allownull:true
    },
    //OPD/IPD/ICU
    appointmentType:{
    	type:DataTypes.STRING,
    	allownull:false,
    	// primaryKey:true,
      validate:{
        isIn:[['','IPD/ICU','OPD']]
      }
    },
    tmtMachine:{
      type:DataTypes.STRING,
      allownull:false,
      // primaryKey:true,
      validate:{
        isIn:[['','NegativeMachine','BPositiveMachine', 'CPositiveMachine','HIVMachine']]
      }
    }    
    // active:{
    //   type:DataTypes.BOOLEAN,
    //   allownull:false
    // }
  }, {
    tableName: 'schedulePatients',
    hooks:{
      afterCreate:function(instance){
        var period = 60;
        instance = JSON.parse(JSON.stringify(instance));
        console.log(instance);
        // appointments for the next 2 months
        var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var now = new Date();
        now.setHours(23,59,59,999);
        // now.setHours(0,0,0,0,0);
        var endDate = new Date();

        endDate.setDate(now.getDate() + period);
        var date = [], x = 0; // multiple dates for same day

        for (var d = new Date(); d <= endDate ; d.setDate(d.getDate() + 1)) {
            // console.log(d + " day: " +weekday[d.getDay()] + "date: " + date[x]);
            if(instance.day == weekday[d.getDay()]){
              d.setHours(23,59,59,999);
              date.push(new Date(d));
              // console.log('instance:');
              // console.log(instance);
              // date.setHours(0,0,0,0,0);

              var appointment = {};
              sequelize.models.patientDetails.find({
                where:{
                  id:instance.patientId
                },
                attributes:['centreId']
              }).then(function(result){
                appointment['centreId'] = result.centreId;
                // appointment['shiftPatientsId'] =instance.id;
                appointment['date'] = new Date(date[x]);
                console.log(date[x++] + '  helooooooooooo ' + instance.day );
                appointment['dayOfTheWeek'] = instance.day;
                appointment['patientId'] = instance.patientId;
                appointment['shiftNumber'] = instance.shiftNumber;
                appointment['appointmentType'] = instance.appointmentType;
                appointment['tmtMachine'] = instance.tmtMachine;
                console.log("appointment Value:");
                console.log(appointment);
                sequelize.models.appointments.build(appointment).save().then(function(result){
                  console.log(JSON.stringify(result));
                });
              });
              
            }
            console.log(d);
            console.log(d.getDate+1);
            console.log();  
        }
      }
    }
  });
};


// afterBulkCreate:function(instances){
      //   // appointments for the next week
      //   var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      //   var now = new Date();
      //   console.log("heyeeeeeeeeeeeeeeee"+now);
      //   var endDate = new Date();
      //   endDate.setDate(now.getDate() + 7);
      //   console.log(endDate);
      //   for (var d = new Date(); d <= endDate ; d.setDate(d.getDate() + 1)) {
      //       // daysOfYear.push(new Date(d));
      //       for(var i = 0; i<instances.length ; i++){
      //         if(instances[i].day == weekday[d.getDay()]){
      //           console.log('')
      //           var appointment = {};
      //           appointment['shiftPatientsId'] =instances[i].id;
      //           console.log(d.getDate()+" looooooooooooooooooooool. " + d);
      //           appointment['date'] = new Date(d);
      //           appointment['dayOfTheWeek'] = instances[i].day;
      //           appointment['patientId'] = instances[i].patientId;
      //           appointment['shiftNumber'] = instances[i].shiftNumber;
      //           sequelize.models.futureAppointments.build(appointment).save().then(function(result){
      //             console.log(JSON.stringify(result));
      //           });
      //         }
      //       }
      //       console.log(d);
      //       console.log(d.getDate+1);
      //       console.log();  
      //   }

      //   // for(var i = 0;i < instances.length;i++){
           
      //   // }
      // }