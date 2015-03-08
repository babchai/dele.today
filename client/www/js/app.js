// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'starter.controllers', 
  'leaflet-directive', 
  'ngCordova', 
  'ngCookies',
  'ngAutocomplete',
  'btford.socket-io',  
  'ion-google-place' ,
  'ionicLazyLoad',
  'ionic.utils',
  'base64'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.run(function(authService){
    authService.init();

})
.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {

    // We need to setup some parameters for http requests
    // These three lines are all you need for CORS support
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = false;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
.config(function($stateProvider, $urlRouterProvider) {
  openFB.init({appId: '603331713130177'});
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('app.stream', {
    url: "/stream",
     views: {
      'menuContent': {
        templateUrl: "templates/stream.html",
        controller: 'StreamCtrl'
      }
    }
  })
  .state('app.login', {
    url: "/login/:redirect",
    views: {
      'menuContent': {
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
      }
    }
  })
.state('app.map', {
    url: "/map",
    cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: 'MapCtrl'
      }
    }
  })
.state('app.form', {
    url: "/form",
    cache: true,
    views: {
      'menuContent': {
        templateUrl: "templates/form.html",
        controller: 'FormCtrl'
      }
    }
  })
.state('app.dashboard', {
    url: "/dashboard",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/dashboard.html",
        controller: 'DashboardCtrl'
        
      }
    }
  })
.state('app.register', {
    url: "/register",
    views: {
      'menuContent': {
        templateUrl: "templates/register.html",
        controller: 'RegisterCtrl'
        
      }
    }
  })
.state('app.checkout', {
    url: "/checkout",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/checkout.html",
        controller: 'CheckoutCtrl'
        
      }
    }
  })
.state('app.main', {
    url: "/main",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/main.html",
        controller: 'MainCtrl'
        
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');

});
