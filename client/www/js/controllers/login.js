angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope ,$http, $location, $state, $cookieStore, $ionicHistory, deleService) {
    


       $scope.doLogin =function(){

            data = this.login;

            deleService.login(data, function(err, result){
                if(!err)
                {
                  console.log(result);
                   window.localStorage['profile'] = JSON.stringify(result);


                   
                    $ionicHistory.nextViewOptions({
                      disableBack: true
                    });
                   $state.go("app.map");
                }
                else
                {
                  console.log(err);
                  alert(err.message);
                }

            });

       };
        

       $scope.register = function(){  

        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go("app.register");
       };

  

});