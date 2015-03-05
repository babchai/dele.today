angular.module('starter')
  .factory('listenerService', function listenerService($http) {
    'use strict';
    
      document.addEventListener("offline", function(){
        alert("Opps! You are offline.");
     }, false);


});