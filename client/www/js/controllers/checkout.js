angular.module('starter.controllers')
  .controller('CheckoutCtrl' ,function ($scope ,$http, $localstorage, dataService, socket) {
    
  		  $scope.delivery = dataService.get();



        /*$scope.delivery.pickup.name = $scope.checkoutData.pickup.name;
        $scope.pickup.address = $scope.checkoutData.pickup.formatted_address;

        $scope.delivery.destination.name = $scope.checkoutData.destination.name;
        $scope.delivery.destination.address = $scope.checkoutData.destination.formatted_address;
        $scope.delivery.fare.text = "MYR"+$scope.checkoutData.fare;*/

        $scope.checkout = function(){


          
        }

    });