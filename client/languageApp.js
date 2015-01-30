angular.module('languageApp', [])

.controller('selectLanguageController', function($scope, $http) {
  $scope.languages = ['english','chinese','spanish','french','italian'];
  $scope.language = {};

  $scope.showChatBox = false;
  $scope.msg = '';
  $scope.convo = '';

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
        document.body.insertBefore(options.video, document.getElementById('chatBox'));
        $scope.$apply(function() { 
          $scope.showChatBox = true; 
        });
      });

      $scope.comm.on('data', function(options) {
        $scope.$apply(function(){
          $scope.convo += 'You: ' + options.data + '\n';
        });
      })

      $scope.comm.on('disconnect', function(options) {
        document.getElementById(options.callerID).remove();
        $scope.$apply(function() {
          $scope.showChatBox = false;
        });
      });
    })
  }

  $scope.sendMsg = function(){
    $scope.comm.send($scope.msg);
    $scope.convo += 'Me: ' + $scope.msg + '\n';
    $scope.msg = ''
  }
})