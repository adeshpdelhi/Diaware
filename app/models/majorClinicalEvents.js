/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('majorClinicalEvents', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventDetails: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    eventComment: {
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
