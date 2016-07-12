/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartPreAssessment', {
    patientId:{
      type:DataTypes.STRING,
      allowNull:false,
      references:{
        model:'patientDetails',
        key:'id'
      }
    },
    preBasicId:{
      type:DataTypes.BIGINT,
      allowNull: false,
      primaryKey:true,
      references:{
        model:'monitoringChartPreBasic',
        key:'preBasicId'
      }
    },
    // preAssessmentId: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    preHDWeight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lastPostHDWeight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    weightGain:{
      type:DataTypes.DECIMAL,
      allowNull:true,
      set:function(){
        var value = this.getDataValue('preHDWeight') - this.getDataValue('lastPostHDWeight'); 
        this.setDataValue('weightGain', value);
      }
    },
    dryWeight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    targetWeightLoss:{
      type:DataTypes.DECIMAL,
      allowNull:true,
      set:function(){
        var value = this.getDataValue('preHDWeight') - this.getDataValue('dryWeight');
        this.setDataValue('targetWeightLoss', value);
      }
    },
    physicalChestPain: {
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
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('hypotension',"Yes");
        }else{
          this.setDataValue('hypotension',"No");
        }
      }
    },
    headache: {
      type: DataTypes.STRING,
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('headache',"Yes");
        }else{
          this.setDataValue('headache',"No");
        }
      }
    },
    cramps: {
      type: DataTypes.STRING,
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('cramps',"Yes");
        }else{
          this.setDataValue('cramps',"No");
        }
      }
    },
    vomiting: {
      type: DataTypes.STRING,
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('vomiting',"Yes");
        }else{
          this.setDataValue('vomiting',"No");
        }
      }
    },
    fever: {
      type: DataTypes.STRING,
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('fever',"Yes");
        }else{
          this.setDataValue('fever',"No");
        }
      }
    },
    rigor: {
      type: DataTypes.STRING,
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('rigor',"Yes");
        }else{
          this.setDataValue('rigor',"No");
        }
      }
    },
    rash: {
      type: DataTypes.STRING,
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('rash',"Yes");
        }else{
          this.setDataValue('rash',"No");
        }
      }
    },
    chest: {
      type: DataTypes.STRING,
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('chest',"Yes");
        }else{
          this.setDataValue('chest',"No");
        }
      }
    },
    other: {
      type: DataTypes.STRING,
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('other',"Yes");
        }else{
          this.setDataValue('other',"No");
        }
      }
    },
    dyspnea: {
      type: DataTypes.STRING,
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('dyspnea',"Yes");
        }else{
          this.setDataValue('dyspnea',"No");
        }
      }
    },
    pruritus: {
      type: DataTypes.STRING,
      allowNull: true,
      set:function(value){
        if(value){
          this.setDataValue('pruritus',"Yes");
        }else{
          this.setDataValue('pruritus',"No");
        }
      }
    },
    generalComments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'monitoringChartPreAssessment'
  });
};
