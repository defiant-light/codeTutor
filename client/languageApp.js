angular.module('languageApp', ['googleTranslateModule', 'ngFx'])

.controller('selectLanguageController', function($scope, $http, Translate) {
  $scope.languages = [['English','us'],['Chinese','cn'],['Spanish','es'],['French','fr'],['Italian','it']];
  $scope.language = {};

  $scope.showChatApp = false;
  $scope.msg = '';
  $scope.convo = '';
  $scope.state = {
    stage: 'a',
  };

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
          Translate.translateMsg(options.data, $scope.language.native, $scope.language.desired)
          .then(function(translatedMsg){
            console.log(translatedMsg);
            var translatedText = translatedMsg.data.translations[0].translatedText
            $scope.convo += 'You: ' + options.data + '\n';
            $scope.convo += 'You (translated): ' + translatedText + '\n';
            $scope.scrollBottom();
          })
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
      document.getElementById('chatMsg').focus();
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
