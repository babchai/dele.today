angular.module('starter.controllers')
  .controller('FormCtrl' ,function ($scope ,$http, omiService) {
    
        // $scope.temp = "asda a"

  		$scope.update = function(val){
  			console.log(val);

  		  console.log(this.temp);

  		};
});