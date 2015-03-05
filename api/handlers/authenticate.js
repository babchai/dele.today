
var Bcrypt = require('bcrypt');
var models = require("../models");
var Boom = require('boom');
var mongoose = require("mongoose");
var config = require('app-config');


module.exports.basic  = function (req, reply) {
		    		   
   //console.log("authen basic");
   //console.log(req);

 	var req = req.raw.req;

   var authorization = req.headers.authorization;
   console.log(authorization);


   if (!authorization) {
        return reply(Boom.unauthorized(null, 'Basic'));
    }

    var parts = authorization.split(/\s+/);

    if (parts[0].toLowerCase() !== 'basic') {
        return reply(Boom.unauthorized(null, 'Basic'));
    }

    if (parts.length !== 2) {
        return reply(Boom.badRequest('Bad HTTP authentication header format', 'Basic'));
    }

    var credentialsPart = new Buffer(parts[1], 'base64').toString();

    var sep = credentialsPart.indexOf(':');
    if (sep === -1) {
        return reply(Boom.badRequest('Bad header internal syntax', 'Basic'));
    }

    var email = credentialsPart.slice(0, sep);
    var credential = credentialsPart.slice(sep + 1);


   models.user.findOne({
   	 email : email
   }, function(err, user){

   	    if(err)
   	    {
          //return reply(err, false);
           return reply(Boom.forbidden('Invalid Login', 'Basic'));

   	    }
   	    else
   	    {
   	    	if(user!=null){
                //credential = Bcrypt.hashSync(credential, 8);
                Bcrypt.compare(credential,user.credential, function (err, isValid) {
                if(isValid)
                {
                    models.profile.findOne({
                   		_id:user.profile_id
                   },function(err, profile){
                   	console.log(profile.name);

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


                        models.accessToken.create({
                        	ttl :  config.app.accessToken.defaultTTL,
                    		user_id : user.id
                        }, function(err, token){

                            ret.token = token.id;
                        	return reply(ret)
                        })

                   });
   				}
   				else
   				{
   					return reply(Boom.forbidden('Invalid Login', 'Basic'));

   				}
	            });
   		    }
   		    else
   		    {
   		    	return reply(Boom.forbidden('Invalid Login', 'Basic'));
   		    }
   		}
   })

   
    
};


	