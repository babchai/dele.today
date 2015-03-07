angular.module('starter.controllers')
.controller('MainCtrl',function($scope, $ionicLoading, $compile, dataService, $ionicHistory,$state){

  $scope.delivery = {};
  $scope.delivery.addresses={};
  $scope.delivery.instructions = [];
  $scope.buttonDisable = true;

  $scope.setView = function(pDetails, id){
  	console.log(id);

  	if(id == 'pickup'){
  		$scope.delivery.addresses.pickup = pDetails;
  	}


    if(id = 'destination')
    {

    	$scope.delivery.addresses.destination = pDetails;

    }      

    if(typeof($scope.delivery.addresses.destination) != 'undefined' && typeof($scope.delivery.addresses.pickup) !='undefined' )
    {
    	   var fare = {};

    	  var distance = new google.maps.DistanceMatrixService();

	      distance.getDistanceMatrix({
	        origins: [$scope.delivery.addresses.pickup.geometry.location],
	        destinations: [$scope.delivery.addresses.destination.geometry.location],
	        travelMode: google.maps.TravelMode.DRIVING
	      }, function(response, status){
	      	
	      	 if(response.rows[0].elements[0].status != "ZERO_RESULTS")
	      	 {
		         var fares = (response.rows[0].elements[0].distance.value / 1000) *1.5;

		         fare.total = fares.toFixed(2);
		         fare.text = "RM" + fares.toFixed(2);
	             console.log(fare);
		         $scope.delivery.fare = fare;
		          $scope.buttonDisable = false;
		         $scope.$apply();
		        
	         }
	         else
	         {
	         	alert("opps! We don't have rocket yet... :p");
	         	$scope.delivery.fare = "";
	         	$scope.buttonDisable = true;
	         	$scope.$apply();

	         }
	      });

    }
  };

   $scope.addInstruction = function(){
      
         console.log("glad");
         console.log(this.instruction);

          $scope.delivery.instructions.push(this.instruction);

          $scope.instructions = "";
           this.instructions = ""
          //$scope.$apply();
   }

   $scope.checkout = function(){

      console.log(this.delivery);
      dataService.set(this.delivery);
      $ionicHistory.nextViewOptions({
              disableBack: false
      });

     $state.go("app.checkout");

    }  

});