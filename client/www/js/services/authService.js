angular.module('starter')
  .factory('authService', function authService($http,$cookies) {
    'use strict';

    return {
      init: function (token) {
          $http.defaults.headers.common['X-Access-Token'] = token || $cookies.token;
      },
    	login:function(token){
            var URL = 'http://localhost:3000/auth/login';
            //console.log(token);
           return $http({
	 	      	url: URL,
       			method:"POST",
       			headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
       			},
       			data: 'fb_access_token='+token
  			})
           .success(function(response){
           	console.log("success");
                return response;

          })
          .error(function(response){
          	console.log("error");
          	  return response;
          });
    	}
    }

});
