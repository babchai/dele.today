angular.module('starter.controllers')
  .controller('StreamCtrl' ,function ($scope ,$http, omiService) {

        $scope.showBackButton = true;

    	$scope.doRefresh = function(){
            var near = '2.1957787,102.2382624';
            var maxDistance = 100;
            var type = 'kilometers';
    
            omiService.nearby(near, maxDistance, type)
            .then(function(response){
                console.log(response.data);
                $scope.streams = response.data;
            });   

             $scope.$broadcast('scroll.refreshComplete');
             $scope.$apply()
    	};

     
        $scope.load = function(){
        	var near = '2.1957787,102.2382624';
        	var maxDistance = 100;
        	var type = 'kilometers';
    
        	omiService.nearby(near, maxDistance, type)
        	.then(function(response){
        		console.log(response.data);
        		$scope.streams = response.data;
               $scope.predicate = '-birthdate';

        	});

        };

        $scope.load();

    });