var mongoose = require('mongoose');
var runnerSchema = new mongoose.Schema({
	   location: [],
	   jobsId: Schema.Types.ObjectId;
	   profileId : Schema.Types.ObjectId;

})

module.exports = mongoose.model('runner', runnerSchema);
