/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shifts', {
    id:{
    	type:DataTypes.STRING,
    	allownull:false,
    	primaryKey:true
    },
    OPDTotalNegativeMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:false,
    	validate:{
    		min:0
    	}
    },
    OPDTotalCPositiveMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}	
    },
    OPDTotalBPositiveMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}
    },
    OPDTotalHIVMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}
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
    IPD_ICU_TotalMachines:{
    	type:DataTypes.INTEGER(11),
    	allownull:true,
    	validate:{
    		min:0
    	}
    },
    IPD_ICU_AvailableMachines:{
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
