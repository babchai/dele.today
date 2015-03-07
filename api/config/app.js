module.exports = {
    db:{
    	name:'dele',
    	host: 'mongodb://localhost',
        port: '27017'
    },
    log:{
    	error:'/log/error.log'
    },
    user:{
    	STATUS:{
    		 ACTIVE : 'active',
    	     DEACTIVE: 'diactive',
    	     
    	  },
    	  TYPE:{
    	  	 CLIENT: 'CLIENT',
    	  	 STAFF : 'STAFF'
    	  }
    },
    accessToken:{
    	defaultTTL : 126000

    },
    delivery:{
        STATUS:{
            PENDING : 'PENDING',
            PROCESSING: 'PROCESSING',
            COMPLETED : 'COMPLETED',
            CANCELLED : 'CANCELLED'
        }
    }

}