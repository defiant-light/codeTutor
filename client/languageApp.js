angular.module('languageApp', [])

.controller('selectLanguageController', function($scope, $http) {
  $scope.languages = ['english','chinese','spanish','french','italian'];
  $scope.language = {};

  $scope.showChatApp = false;
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
        document.body.insertBefore(options.video, document.getElementById('chatApp'));
        $scope.$apply(function() { 
          $scope.showChatApp = true; 
        });
      });

      $scope.comm.on('data', function(options) {
        $scope.$apply(function(){
          $scope.convo += 'You: ' + options.data + '\n';
          $scope.scrollBottom();
        });
      })

      $scope.comm.on('disconnect', function(options) {
        document.getElementById(options.callerID).remove();
        $scope.$apply(function() {
          $scope.showChatApp = false;
        });
      });
    })
  }

  $scope.sendMsg = function(){
    if($scope.msg.trim() !== '') {
      $scope.comm.send($scope.msg);
      $scope.convo += 'Me: ' + $scope.msg + '\n';
      $scope.msg = ''
      $scope.scrollBottom();
    }
  }

  $scope.handleKeyPress = function(event){
    if(event.which === 13) {
      $scope.sendMsg();
    }
  }

  $scope.scrollBottom = function(){
    var chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
  }
})