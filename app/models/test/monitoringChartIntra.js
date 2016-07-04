/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monitoringChartIntra', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monitoringId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    entryNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    entryTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ap: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tmp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ufr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    totalUF: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bfr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ebf: {
      type: DataTypes.STRING,
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
