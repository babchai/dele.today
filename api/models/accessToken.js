var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var accessTokenSchema = new mongoose.Schema({
	 ttl:Number,
	 created : {type: Date, default: Date.now },
	 user_id : Schema.Types.ObjectId

});

module.exports = mongoose.model('accessToken', accessTokenSchema);
