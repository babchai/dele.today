var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
	 email:String, 
     credential:String,
     profile_id : Schema.Types.ObjectId

});

module.exports = mongoose.model('user', userSchema);
