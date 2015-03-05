var Bcrypt = require('bcrypt');
var config = require('app-config');
var models = require("../models");
var  HTTPStatus = require('http-status');
var script = require("../script.js");
var mongoose = require("mongoose");

var register = function(request, reply)
{
    //console.log(request.payload);
    //var params = JSON.stringify(eval("(" + request.payload + ")"));
    //var params =request.payload;
    params = request.payload;

    var profileDoc ={

    name: params.name,
		email : params.email,
		contact: {
				prefix : params.contact.prefix, 
				number : params.contact.number
		},
		country : String,
		type : config.app.user.TYPE.CLIENT,
		status: config.app.user.STATUS.ACTIVE,
    creditcard :[{
       _id : mongoose.Types.ObjectId(),
       name:params.creditcard.name || 'personal',
       type: script.GetCardType(params.creditcard.number),
       number : params.creditcard.number,
       yy : params.creditcard.yy,
       mm : params.creditcard.mm,
       ccv : params.creditcard.ccv
     }]

    };


	var defaultTTL = config.app.accessToken.defaultTTL;

    var credential = params.credential;

   models.profile.findOne({
   		'email' : request.payload.email
   }, function(err, result){
   		if(result){
   			return reply({'statusCode': HTTPStatus.CONFLICT, 
   				     	  'message': request.payload.email +" already exists."}).code(409);
   		}
   		else{
         models.profile.create(profileDoc , function(err, profile){
         		if(err){
         			return reply(err);
         		}
         		else
         		{
         			profileId = profile._id;

         			Bcrypt.hash(params.credential, 8, function(err, hash) {
         				models.user.create({
  						 email : params.email,
  						 credential : hash,
  						 profile_id : profileId
         			}, function(err, user){
                  models.accessToken.create({
                    ttl :  defaultTTL,
                    user_id : user._id
                  }, function(err, token){
                       var ret = {};
                       ret.name = profile.name;
                       ret.email = profile.email;
                       ret.contact = profile.contact;
                       ret.type = profile.type;
                      // foreach(card in profile.creditcard)
                       var tmp = [];

                       for(var i = 0; i<profile.creditcard.length; i++ ){
                          var card = {};
                          cards = profile.creditcard[i];
                          card.number = "******"+cards.number.substr(cards.number.length -4);
                          card.id = cards._id;
                          card.type = cards.type;
                          card.name = cards.name;
                          tmp.push(card);
                       }
                       ret.creditcard = tmp;
                       ret.token = token._id;
                      return reply(ret)
                  })
              })
					});	
         		}
         });

   		}

   });
 }

 module.exports = register;
