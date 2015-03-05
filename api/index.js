var Bcrypt = require('bcrypt');
var Hapi = require('hapi');
var Good = require('good');
var Basic = require('hapi-auth-basic');
var  HTTPStatus = require('http-status');

var config = require('app-config');
//var mongo = require('hapi-mongoose-db-connector');
var models = require("./models");

var handlers = require("./handlers");
var validates = require("./validates");

// Create a server with a host and port


var server = new Hapi.Server();


server.connection({
	  host : "localhost",
      port: 3000,
      routes:{
      	cors:true
      }
  });


// Add the route
server.route({
    method: 'POST',
    path:'/register',
    handler: handlers.register,
    config:{
    	validate : validates.register
    }
});


server.route({
    method: 'GET',
    path:'/login',
    handler:  handlers.authenticate.basic,
    
});



server.register([
    {
 	 	register:Basic	
    },
	{

	    register: Good,
	    options: {
	        reporters: [{
	            reporter: require('good-console'),
	            args:[{ log: '*', response: '*' }]
	        }]
	    }
	},
    {
        register: require('hapi-mongoose-db-connector'),
        options: {
        	mongodbUrl: config.app.db.host+':'+config.app.db.port+"/"+config.app.db.name
        } 
    }
], function (err) {
    if (err) {
        console.error('Failed to load a plugin:', err);
    }
    

    server.auth.strategy('simple', 'basic', { validateFunc: handlers.authenticate.basic});

  

    server.route({
        method: 'GET',
        path: '/_login',
        config: {
            cors : {
                credentials : true
            },
            auth: 'simple',
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name);
            }
        }
    });
});    

// Start the server
server.start(function () {

    server.log('info', 'Server running at: ' + server.info.uri);
    server.log('DB URL:', config.app.db.host+':'+config.app.db.port+"/"+config.app.db.name);
    server.log('error log:', config.app.log.error);
    
    var mongoose = require('mongoose');
    var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
	     console.log("MongoDB OK!");
	});
});

