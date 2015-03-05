var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jobSchema = new mongoose.Schema({
	 addresses :{
	 	pickup: {
			building:String,
			floorOrUnit:String,
			company:String,
			street:String,
	    } , 
		dropoff:{
			building:String,
			floorOrUnit:String,
			company:String,
			street:String,
		} 
	},
	instruction:[String],
	requesterID:Schema.Types.ObjectId,
	deliverID:Schema.Types.ObjectId,
	date : {
		request :  {type: Date, default: Date.now }, 
		complete :  {type: Date, default: Date.now}
	},
	status : String
	
});

module.exports = mongoose.model('job', jobSchema);
