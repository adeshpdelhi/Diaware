/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartIntra', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model:'patientDetails',
        key:'id'
      }
    },
    intraId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references:{
        model:'monitoringChartPreBasic',
        key:'preBasicId'
      }
    },
    entryNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey:true,
      validate:{
        min:0,
        max:8
      }
    },
    // in minutes ex 30 min 60 min 180 min 
    entryTime: {
      type: DataTypes.INTEGER(11),
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
