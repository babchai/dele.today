var url = "http://localhost:3000/"
angular.module('starter')
  .factory('deleService', function deleService($http, $base64) {
    'use strict';

    return {
    	register: function(data, cb){
    		console.log(data);

            $http(
            	{
            		method: 'POST', 
            		headers: {
        					"Content-Type": "application/json"
        			},
        			withCredentials: false,
    				dataType: 'json',
            		url: url+"register",
            		data:data
            		//data : {"email":"babchaihaha@hotmail.com","name":{"first":"bab","last":"bab"},"country":"malaysia","contact":{"prefix":"60","number":"0163771829"},"credential": "macro123"}

            	}
            	).success(function(response){
            		console.log(response);
            		return cb(null,response);
            		//console.log(response);
            	}).error(function(error){
            		return cb(error);
            		//console.log(error);
            	});
    	},
    	login : function(data, cb){
           console.log(data);

			  $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(data.email + ':' + data.password);

         $http(
 				{
					withCredentials : false,
					headers: {
			            'Authorization': 'Basic ' + $base64.encode(data.email + ':' + data.password)
			        },
        			url: url+"login",
        			data:data
 		    })
 			   .success(function(response){
           		console.log(response);
           		return cb(null, response);

           	}).error(function(error){

           		console.log(error);
           		return cb(error);

           	});

    	}
    }

});