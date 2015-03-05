angular.module('starter.controllers')
    .controller('MapCtrl', ['$scope',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$timeout',
    'omiService',
    'dataService',
    'leafletData',
    '$state',
    '$ionicHistory',
    'socket',
    function(
      $scope,
      $cordovaGeolocation,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      $timeout,
      omiService,
      dataService,
      leafletData,
      $state,
      $ionicHistory,
      socket
      ){
      
      $scope.checkoutData = []; 

      $scope.$on("$stateChangeSuccess", function() {
         $scope.buttonDisable = true;
        var  userLocation = dataService.get();

       /*socket.on('RunnerLocation', function(data){
          console.log(data);
              $scope.markers["runner"+data.id] = {
                lat : data.location.lat,
                lng : data.location.lng,
              };
        });


        $scope.$on('socket:error', function (ev, data) {
            console.log(ev);
            console.log(data);
        });*/
      });


       angular.extend($scope, {
                defaults:{
                  zoomControl : false
                },
                center:{
                  lat : 4.2104840,
                  lng :101.9757660,
                  zoom:4
                },
                tiles : {
                            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
                            options: {
                                attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
                            }
                        },  
                markers :{},     
                zoomControl:false,     
                layers: {
                    baselayers: {
                        googleRoadmap: {
                            name: 'Google Streets',
                            layerType: 'ROADMAP',
                            type: 'google'
                        }
                    }
                  },
            });

        
            /*navigator.geolocation.getCurrentPosition(function(position){
                //console.log(position)
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                $scope.center  = {
                  lat : latitude,
                  lng : longitude,
                  zoom : 16
                };

            });*/


         $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
            //console.log(position);
              var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                $scope.center  = {
                  lat : latitude,
                  lng : longitude,
                  zoom : 16
                };
          }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
            alert(err);
          });
       
        $scope.setView = function(pDetails, id){
           // var geo = new google.maps.LatLng(pDetails.geometry.location);

            $scope.checkoutData[id] = pDetails;
            $scope.center  = {
              lat : pDetails.geometry.location.lat(),
              lng : pDetails.geometry.location.lng(),
              zoom : 16
            };

      
            $scope.markers[id] = {
                lat : pDetails.geometry.location.lat(),
                lng : pDetails.geometry.location.lng(),
                message : id
              };

              if($scope.markers['destination'] != undefined && $scope.markers['pickup'] != undefined )
              {
                var dGeo = [$scope.markers['destination'].lat, $scope.markers['destination'].lng];
                var pGeo = [$scope.markers['pickup'].lat, $scope.markers['pickup'].lng]; 
                //console.log(dGeo);
                //console.log(pGeo);
                leafletData.getMap().then(function(map) {
                        map.fitBounds([pGeo, dGeo]);    
                  });
                 var dLatLng = new google.maps.LatLng($scope.markers['destination'].lat, $scope.markers['destination'].lng);
                 var pLatLng = new google.maps.LatLng($scope.markers['pickup'].lat, $scope.markers['pickup'].lng);
                  
                  $scope.totalDistance = '';

                 var distance = new google.maps.DistanceMatrixService();
                  distance.getDistanceMatrix({
                    origins: [pLatLng],
                    destinations: [dLatLng],
                    travelMode: google.maps.TravelMode.DRIVING
                  }, function(response, status){
                     var fare = (response.rows[0].elements[0].distance.value / 1000) *1.5;
                     console.log(fare);
                     $scope.totalFare = fare.toFixed(2);
                     $scope.checkoutData['fare']  = $scope.totalFare;
                     $scope.totalFareText = "RM" + fare.toFixed(2) ;
                  });

                  $scope.buttonDisable = false;

            }

        }

      $scope.checkout = function(){

         console.log($scope.checkoutData);
         // var checkoutData = $scope.checkoutData;
          dataService.set($scope.checkoutData);
          $ionicHistory.nextViewOptions({
              disableBack: false
          });


          $state.go("app.checkout");

      }  
    }]
);  