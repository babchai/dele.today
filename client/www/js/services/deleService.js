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

    	},
      pullDelivery:function(data, cb){
        $http(
        {
          withCredentials : false,
          method: 'GET',
          url: url+"delivery/user/"+data.user_id,
          headers: {
                  "Content-Type": "application/json"
              },
          dataType: 'json'
        })
        .success(function(response){
              console.log(response);
              return cb(null, response);

         }).error(function(error){

              console.log(error);
              return cb(error);

         });
    },
    createDelivery:function(data, cb){
        $http(
        {
          withCredentials : false,
          method: 'POST',
          url: url+"delivery",
          headers: {
                  "Content-Type": "application/json"
              },
          dataType: 'json',
          data:data
        })
        .success(function(response){
              return cb(null, response);

            }).error(function(error){
              return cb(error);
            });
    }
    

 }
});