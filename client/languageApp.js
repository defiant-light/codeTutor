angular.module('languageApp', [])

.controller('selectLanguageController', function($scope, $http) {
  $scope.languages = ['english','chinese','spanish','french','italian'];
  $scope.language = {};

  $scope.showChatBox = false;
  $scope.msg = '';

  $scope.submitLanguages = function(languageSelections){
    return $http({
      method: 'GET',
      url: '/api/getroom',
      params: languageSelections
    })
    .success(function(data){
      $scope.comm = new Icecomm('IbQqKDNCGQS7b94Mllk/iHOJbeSe/UrJJy6l1BbqEbP0fKaK');

      $scope.comm.connect(data);

      $scope.comm.on('local', function(options) {
        localVideo.src = options.stream;
      });

      $scope.comm.on('connected', function(options) {
        document.body.appendChild(options.video);
        $scope.$apply(function() { 
          $scope.showChatBox = true; 
        });
      });

      $scope.comm.on('data', function(options) {
        console.log(options.data);
      })

      $scope.comm.on('disconnect', function(options) {
        document.getElementById(options.callerID).remove();
        $scope.showChatBox = false;
      });
    })
  }

  $scope.sendMsg = function(){
    $scope.comm.send($scope.msg);
  }
})