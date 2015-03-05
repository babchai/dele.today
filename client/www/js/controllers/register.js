angular.module('starter.controllers')
  .controller('RegisterCtrl', function ($scope ,$http, $location, $state, $cookieStore, $ionicHistory, deleService) {

     //deleService.register();
     $scope.register = function()
     {

        //console.log(this.profile);
        deleService.register(this.profile, function(err, result){
        		if(!err){
			        $ionicHistory.nextViewOptions({
			          disableBack: true
			        });


			        window.localStorage['profile'] = JSON.stringify(result);
        		    $state.go("app.map");

        		}
        		else
        		{
        			//console.log(err);
        			if(err.statusCode == 409)
        			{
        				alert(err.message);
        			}
        			else if(err.statusCode == 400)
        			{
        				alert(err.message);
        			}
        			else
        			{
        				alert("Oops! Something went wrong!<br>Help us improve your experience by sending an error report");
        			}

        		}

        	//console.log(result);
        });

     }

  });