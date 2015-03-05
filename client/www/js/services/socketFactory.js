angular.module('starter')
.factory('socket', function (socketFactory) {
 return{
        connect :function()
        {
          var myIoSocket = io.connect('http://localhost:3000');
          mySocket = socketFactory({
            ioSocket: myIoSocket
          });
          
          return mySocket;
        }

}



});