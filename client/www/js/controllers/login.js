angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope ,$http, $location, $state, $cookieStore, $ionicHistory, deleService,$stateParams) {
    

      // console.log($stateParams);
       $scope.doLogin =function(){

            data = this.login;

            deleService.login(data, function(err, result){
                if(!err )
                {
                  console.log(result);

                  if(result !=null)
                  {
                    window.localStorage['profile'] = JSON.stringify(result);

                    $ionicHistory.nextViewOptions({
                      disableBack: true
                    });
                   if($stateParams.redirect !="")
                   {
                      $state.go($stateParams.redirect);
                   }
                   else
                   {
                      $state.go("app.map");
                   }
                 }
                 else
                 {
                    alert("Opps! System error. ");
                 }
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