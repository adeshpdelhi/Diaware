/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartIntra', {
    monitoringDate:{
      type:DataTypes.Date,
      allowNull:true
    },
    intraId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    entryNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      validate:{
        min:1,
        max:8
      }
    },
    // in min ex 30 min 60 min 180 min 
    entryTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bp: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pr: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ap: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    vp: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    tmp: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ufr: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    totalUF: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    bfr: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ebf: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'monitoringChartIntra'
  });
};
