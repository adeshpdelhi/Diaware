/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shifts', {
    id:{
    	type:DataTypes.STRING,
    	allownull:false,
    	primaryKey:true
    },
    OPDAvailableNegativeMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:false,
    	validate:{
    		min:0
    	}
    },
    OPDAvailableBPositiveMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}
    },
    OPDAvailableCPositiveMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}
    },
    OPDAvailableHIVMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}
    },
    
    // IPD_ICUAvailableMachines:{
    // 	type:DataTypes.INTEGER(11),
    // 	allownull:true,
    // 	validate:{
    // 		min:0
    // 	}
    // },
    IPD_ICUAvailableNegativeMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}
    },
    IPD_ICUAvailableBPositiveMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}
    },
    IPD_ICUAvailableCPositiveMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}
    },
    IPD_ICUAvailableHIVMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}
    }
    // lastModifiedBy:{
    // 	type:DataTypes.STRING,
    // 	allownull:true
    // }
  }, {
    tableName: 'shifts'
  });
};
