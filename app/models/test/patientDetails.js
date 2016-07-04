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
      type: Sequelize.DATE,
      allowNull: true,
      validate:{
        isBefore: Sequelize.NOW
      }
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      validate:{
        isIn:[['M','F']]
      }
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
      unique:true,
      validate:{
        len:10,
        isNumeric:true
      }
    },
    alternativeContact: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        len:10,
        isNumeric:true
      }

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
      allowNull: true,
      validate:{
        isIn:[['B-','B+','A+','A-', 'O+', 'O-','AB+','AB-']]
      }
    },
    transplantWaitingList: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['Yes', 'No']]
      }
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        isIn:[['married','unmarried']]
      }
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
      allowNull: true,
      validate:{
        len:10,
        isNumeric:true
      }
    },
    numberOfChildren: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    childrenContact: {
      type: DataTypes.STRING,
      allowNull: true,
      validate:{
        len:10,
        isNumeric:true
      }
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
      allowNull: true,
      validate:{
        isIn:[['Cash','Panel']]
      }
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
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'patientDetails',
  });
};



// var Foo = sequelize.define('foo', {
//   firstname: Sequelize.STRING,
//   lastname: Sequelize.STRING
// }, {
//   getterMethods   : {
//     fullName       : function()  { return this.firstname + ' ' + this.lastname }
//   },

//   setterMethods   : {
//     fullName       : function(value) {
//         var names = value.split(' ');

//         this.setDataValue('firstname', names.slice(0, -1).join(' '));
//         this.setDataValue('lastname', names.slice(-1).join(' '));
//     },
//   }
// });