var mongoose = require('mongoose');
var config = require('app-config');

var Schema = mongoose.Schema;
var deliverySchema = new mongoose.Schema({
	 addresses :{
	 	  pickup:{},
	 	  destination:{}
	 	/*pickup: {
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
		} */
	},
	instructions:[String],
	fare:{
		text : String,
		total : String
	},
	requesterID:Schema.Types.ObjectId,
	deliverID:Schema.Types.ObjectId,
	date : {
		request :  {type: Date, default: Date.now }, 
		complete :  {type: Date}
	},
	status : {type:String, default: config.app.delivery.STATUS.PENDING}
	
});

module.exports = mongoose.model('delivery', deliverySchema);
