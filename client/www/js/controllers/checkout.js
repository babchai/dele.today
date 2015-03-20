angular.module('starter.controllers')
  .controller('CheckoutCtrl' ,function ($scope ,$http, $localstorage, $state, deleService, dataService, socket) {
    
  		$scope.delivery = dataService.get();

        $scope.pre_confirm = true;
        $scope.confirm = false;

        console.log($scope.delivery);

        $scope.checkout = function(){

             Profile = window.localStorage['profile'];
            

             if(Profile == null)
             {
                $state.go('app.login', {redirect:'app.checkout'});

             }
             else{
                Profile = JSON.parse(Profile);
                console.log(Profile);
                $scope.delivery.requesterID = Profile.user_id;
                console.log(this.delivery);
                deleService.createDelivery(this.delivery, function(err, result){
                    if(err)
                        alert(err.message);
                    else
                    {
                        $scope.pre_confirm = false;
                        $scope.confirm = true;
                        //console.log(result);
                    }
                });
             }
        }

    });