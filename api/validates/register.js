var joi = require('joi');

var register = {
    		options:{
    			allowUnknown : true
    		},
    		payload :{
    			email : joi.string().email().required(),
    			name : joi.string().required(),
    			contact:{
    				prefix : joi.number().required(),
    				number : joi.number().required()
    			},
    			credential: joi.string().required(), 
    		}
    	};

module.exports = register;    	