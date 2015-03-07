angular.module('starter.controllers')
  .controller('CheckoutCtrl' ,function ($scope ,$http, $localstorage, dataService, socket) {
    
  		$scope.delivery = dataService.get();


        console.log($scope.delivery);

        $scope.checkout = function(){

             Profile = window.localStorage['profile'];

             if(Profile == null)
             {
                $state.go('app.login', {redirect:'app.checkout'});

             }
             else{
                    

             }


          
        }

    });