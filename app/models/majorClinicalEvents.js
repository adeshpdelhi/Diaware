/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('majorClinicalEvents', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model: 'patientDetails',
        key: 'id'
      }
    },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'majorClinicalEvents'
  });
};
