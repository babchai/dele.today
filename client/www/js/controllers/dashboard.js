angular.module('starter.controllers')
  .controller('DashboardCtrl', function ($scope ,$http, $state,$ionicHistory ) {

  		 //console.log(window.localStorage.profile);
         if(typeof window.localStorage['profile'] !='undefined')
         {
            Profile = window.localStorage['profile'];
            Profile = JSON.parse(Profile);
            $scope.profile = Profile;

         	$scope.creditcards = $scope.profile.creditcard;

         	$scope.ready = true;
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