/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patientDetails', {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    alternativeContact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transplantWaitingList: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emergencyContactName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emergencyContactRelationship: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emergencyContactMobile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numberOfChildren: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    childrenContact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employementStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    officeName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    officeAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    otherClinicalDetails: {
      type: DataTypes.STRING,
      allowNull: true
    },
    modeOfPayment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    refferedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    doctorName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    viralMarketStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    centreId: {
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
    tableName: 'patientDetails'
  });
};
