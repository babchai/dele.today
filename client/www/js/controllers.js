angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaGeolocation) {
   
  document.addEventListener("deviceready", onDeviceReadyGeo, false);

  function onDeviceReadyGeo() { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
      }, function(error){
         console.log(error);
      }, {timeout:10000});
    } else {
      error('Geo Location is not supported');
    }
  }


});

