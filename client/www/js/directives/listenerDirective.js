angular.module('starter')
.directive('networkListener', function(){
  return function(scope, element, attrs){
  	console.log("networkListener");
     document.addEventListener("offline", function(){
     	console.log("Opps! You are offline.");
        alert("Opps! You are offline.");
     }, false);
  }
});