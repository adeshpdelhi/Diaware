/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartPre', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monitoringdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    monitoringId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
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
    startTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accessUsed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    centralLineCreated: {
      type: DataTypes.STRING,
      allowNull: true
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
    heparinStopBefore: {
      type: DataTypes.STRING,
      allowNull: true
    },
    NSFlushingFrequency: {
      type: DataTypes.STRING,
      allowNull: true
    },
    NSFlushingVolume: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    machineTestPassed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    machineTestCheckedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    airDetector: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alarmLimits: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dialysateFlowRate: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    dialysisCounterCurrentFlow: {
      type: DataTypes.STRING,
      allowNull: true
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
    postWeight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    weightGain: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    targetWeightLoss: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    actualWeightLoss: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    physicalPain: {
      type: DataTypes.STRING,
      allowNull: true
    },
    chestAuscultation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    recentSurgery: {
      type: DataTypes.STRING,
      allowNull: true
    },
    peripheralOedema: {
      type: DataTypes.STRING,
      allowNull: true
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
      allowNull: true
    },
    subjectiveStatement: {
      type: DataTypes.STRING,
      allowNull: true
    },
    interdialyticComplaints: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ambulatoryStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hypotension: {
      type: DataTypes.STRING,
      allowNull: true
    },
    headache: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cramps: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vomiting: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fever: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rigor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rash: {
      type: DataTypes.STRING,
      allowNull: true
    },
    chest: {
      type: DataTypes.STRING,
      allowNull: true
    },
    other: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dyspnea: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pruritus: {
      type: DataTypes.STRING,
      allowNull: true
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
      allowNull: true
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
    lastModified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'monitoringChartPre'
  });
};
