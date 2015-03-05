angular.module('starter.controllers')
  .controller('MapCtrl', function ($scope ,$http, $q ,$cordovaGeolocation, leafletData , omiService) {
    
    
   console.log('map');
   
    $scope.$on("$stateChangeSuccess", function() {

      $scope.map = {
          defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'topleft'
          },
          markers : {},
          events: {
          }
        };
    });
       
    $scope.$on("leafletDirectiveMap.click", function(event, args){
      console.log("click");
                var leafEvent = args.leafletEvent;
                console.log(leafEvent);
                $scope.markers.push({
                    lat: leafEvent.latlng.lat,
                    lng: leafEvent.latlng.lng,
                    message: "My Added Marker"
                });
            });    

    
      
  

   /*var getOmi = omiService.all();

   getOmi.then(function(response){
        //console.log(response.data);
       var markers = [];
        angular.forEach(response.data, function(value, key) {
            //this.push(key + ': ' + value);

            var ret = {
              lat : value.latlng.lat,
              lng : value.latlng.lng,
              message: value.message,
              focus : true
            };
            markers.push(ret);
            //console.log(key);
            

        });

        console.log(markers);
        $scope.pointer = markers;
   });*/
   
  //  navigator.geolocation.getCurrentPosition(setCenter);

   /*function setCenter(position){
        $scope.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 13
        }
   };*/




   /*$scope.pointer = {
           osloMarker: {
                lat: 59.91,
                lng: 10.75,
                message: "I want to travel here!",
                focus: true,
                draggable: false
            },
            oslo2Marker: {
                lat: 59.44,
                lng: 10.24,
                message: "I want to travel here!",
                focus: true,
                draggable: false
            }

        }*/
        
 
  });
