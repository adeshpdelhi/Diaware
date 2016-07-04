/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartPre', {
    monitoringDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    preId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    machineNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    bedNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    leadTechnicianName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prescribedDuration: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    // 12 hr format
    startTime: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        len:5,
        isCorrectFormat: function(value){
          var times = value.split(':');
          if(!(parseInt(times[0]) <= 12 && parseInt(times[0]) >= 0) || !(parseInt(times[1]) < 60 && parseInt(times[1]) >= 0)) 
            throw new Error('Invalid Time format');
        }
      }
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        len:5,
        isCorrectFormat: function(value){
          var times = value.split(':');
          if(!(parseInt(times[0]) <= 12 && parseInt(times[0]) >= 0) || !(parseInt(times[1]) < 60 && parseInt(times[1]) >= 0)) 
            throw new Error('Invalid Time format');
        }
      }
    },

    // use drop down - fetched from centers access lines available
    accessUsed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    centralLineCreated: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes', 'No']]
      }
    },
    centralLine: {
      type: DataTypes.STRING,
      allowNull: true
    },
    anticoagulant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bolusAmount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    hourlyHeparin: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //time input in HH:MM 12 hr format
    heparinStopBefore: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        len:5,
        isCorrectFormat: function(value){
          var times = value.split(':');
          if(!(parseInt(times[0]) <= 12 && parseInt(times[0]) >= 0) || !(parseInt(times[1]) < 60 && parseInt(times[1]) >= 0)) 
            throw new Error('Invalid Time format');
        }
      }
    },
    NSFlushingFrequency: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    NSFlushingVolume: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },


    machineTestPassed: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    machineTestCheckedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    airDetector: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    alarmLimits: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    dialysateFlowRate: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    dialysisCounterCurrentFlow: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    dialysateTemperature: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    conductivity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    partAConcentrationCombination: {
      type: DataTypes.STRING,
      allowNull: true
    },


    preHDWeight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lastPostHDWeight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    dryWeight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    
    physicalChestPain: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    chestAuscultation: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    recentSurgery: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    peripheralOedema: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    respiratoryStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    temperature: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pulse: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    BPSitting: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    BPStanding: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    breakfastLunchDinner: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    subjectiveStatement: {
      type: DataTypes.STRING,
      allowNull: true
    },
    interdialyticComplaints: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    ambulatoryStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hypotension: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    headache: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    cramps: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    vomiting: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    fever: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    rigor: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    rash: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    chest: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    other: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    dyspnea: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    pruritus: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    generalComments: {
      type: DataTypes.STRING,
      allowNull: true
    },

    
    bruit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    anyAbnormality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    signOfAccessInfection: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:['Yes','No']
      }
    },
    cannulation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    centralLineStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    commencedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    assistedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'monitoringChartPre'
  });
};
