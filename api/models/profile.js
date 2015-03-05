var mongoose = require('mongoose');
var profileSchema = new mongoose.Schema({
		name: String,
		email : String,
		contact: {
				prefix : String, 
				number : Number
		},
		places: [{name : String,
				address : String}]
		,
		country : String,
		creditcard:[],
		type : String,
		staff_profile:{ 
    		bank_account:{ 
				bank:String, 
			    number:String
			},
			vehicle :{
			     type:String, 
			     model:String, 
			     registration:String
			}, 
			location:String, 
			pay_slip:[]
		},
		status:String
		

});

module.exports = mongoose.model('profile', profileSchema);
