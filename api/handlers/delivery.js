var Bcrypt = require('bcrypt');
var config = require('app-config');
var Boom = require('boom');
var models = require("../models");
var  HTTPStatus = require('http-status');
var script = require("../script.js");
var mongoose = require("mongoose");


module.exports.getUserDelivery = function(request, reply)
{

   var id = encodeURIComponent(request.params.id)
   models.delivery.find({requesterID : mongoose.Types.ObjectId(id)}, function(err, delivery){
   	    if(!err)
   	    {
         return reply(delivery).code(200);
       }
       else
       {
       	 console.log(err);
       	 return reply(Boom.internal('Failed', 'Basic'))
       } 

   });
}

module.exports.create = function(request, reply)
{
   var params = request.payload;


 var deliveryDoc = {
       addresses : params.addresses,
       instructions : params.instructions,
       fare : params.fare, 
       requesterID : params.requesterID,
   }

    console.log(deliveryDoc);

  
	//deliveryDoc.requesterID = accessToken.user_id;
		
   
	models.delivery.create(deliveryDoc, function(err, delivery){

		   if(err)
		   {
				  return reply(Boom.internal('Insert Failed.', 'Basic'));
		   }
		   else
		   {
		   	  return reply(delivery).code(200);
		   }

	});


}


