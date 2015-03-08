angular.module('starter.controllers')
  .controller('DashboardCtrl', function ($scope ,$http, $state,$ionicHistory, deleService ) {

  		 //console.log(window.localStorage.profile);
         if(typeof window.localStorage['profile'] !='undefined')
         {
            Profile = window.localStorage['profile'];
            Profile = JSON.parse(Profile);
            $scope.profile = Profile;

         	$scope.creditcards = $scope.profile.creditcard;

         	$scope.ready = true; 

            deleService.pullDelivery({user_id : Profile.user_id}, function(err, deliveries){
               if(!err)
               {
                 $scope.deliveries  = deliveries;
               }

            });
         }
         else
         {


	        $ionicHistory.nextViewOptions({
	          disableBack: true
	        });
         	 $state.go("app.login");
         }


        


         $scope.signout = function(){

         	localStorage.removeItem('profile');
         	$state.go("app.login");
         };
 });