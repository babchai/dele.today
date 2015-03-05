angular.module('starter')
  .factory('omiService', function omiService($http) {
    'use strict';

    return {

      all: function (key) {
        var URL = 'http://localhost:3000/api/Omis';
        return $http.get(URL).success(function(response){
           return response;

        });
      },
      nearby: function (near,maxDistance,type) {
        if(type == null)
        {
          type = 'kilometers';
        }
        var URL = 'http://localhost:3000/api/Omis/nearby?near='+near+'&maxDistance='+maxDistance+'&type='+type;
        return $http.get(URL).success(function(response){
           return response;

        });
      },
      getOpenkeyval: function (key) {
        var getURL = 'http://api.openkeyval.org/';

        return $http.jsonp(getURL + key, {
          'params': {
            'callback': 'JSON_CALLBACK'
          }
        }).then(
          function (response) {
            // In this case we'll dig out the value we actually want and use that to resolve the promise which .then()
            // has created for us.
            return response.data;
          }
        );
      }
    };
  });
