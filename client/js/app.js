angular.module('languageApp', ['translateModule', 'ngFx'])

.controller('selectLanguageController', function($scope, $http, Translate) {
  $scope.languages = [['Javascript','us'],['Python','cn'],['Algebra','es'],['Geometry','fr'],['SQL','it']];
  $scope.levels = [["Expert",10],["Experienced",8],["Intermediate",6],["Beginner",4],["Novice",2]];
  $scope.level={};
  $scope.language = {};

  $scope.showChatApp = false;
  $scope.msg = '';
  $scope.convo = '';
  $scope.waiting=false;

  $scope.submitLanguages = function(languageSelections){
    return $http({
      method: 'GET',
      url: '/api/getroom',
      params: languageSelections
    })
    .success(function(data){
      $scope.comm = new Icecomm('IbQqKDNCGQS7b94Mllk/iHOJbeSe/UrJJy6l1BbqEbP0fKaK');

      $scope.comm.connect(data);

      // Show video of the user
      $scope.comm.on('local', function(options) {
        console.log(options.stream);
        $('#localVideo').attr("src", options.stream);
      });

      // When two people are connected, display the video of the language partner
      // and show the chat app
      $scope.comm.on('connected', function(options) {
        var foreignVidDiv = $('<div class="inline"></div>');
        foreignVidDiv.append(options.video)
        foreignVidDiv.children().addClass('foreignVideo');
        $('#videos').prepend(foreignVidDiv);
        // document.getElementById('videos').insertBefore(document.createElement("$BUTTON")options.video, document.getElementById('myVideo'));
        $scope.$apply(function() { 
          $scope.showChatApp = true; 
        });
      });

      // When a chat message is received from the language partner,
      // translate the message using Google Translate and
      // display both the original message and the translated message
      $scope.comm.on('data', function(options) {
        $scope.$apply(function(){
          Translate.translateMsg(options.data, $scope.language.native, $scope.language.desired)
          .then(function(translatedMsg){
            console.log(translatedMsg);
            var translatedText = translatedMsg.data.translations[0].translatedText
            $scope.convo += 'Them: ' + options.data + '\n';
            $scope.convo += 'Them (translated): ' + translatedText + '\n';
            $scope.scrollBottom();
          })
        });
      })

      // When the language partner leaves, remove the video and chatbox
      $scope.comm.on('disconnect', function(options) {
        document.getElementById(options.callerID).remove();
        $scope.$apply(function() {
          $scope.showChatApp = false;
        });
      });
    })
  }

  // Function to send a message to the language partner
  // and display the sent message in the chatbox
  $scope.sendMsg = function(){
    if($scope.msg.trim() !== '') {
      $scope.comm.send($scope.msg);
      $scope.convo += 'You: ' + $scope.msg + '\n';
      $scope.msg = ''
      $scope.scrollBottom();
      document.getElementById('chatMsg').focus();
    }
  }

  // Function to send a chat message when the enter/return
  // button is pressed
  $scope.handleKeyPress = function(event){
    if(event.which === 13) {
      $scope.sendMsg();
    }
  }

  // Function to move the scroll bar to the bottom of the textarea
  $scope.scrollBottom = function(){
    var chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = 99999;
  }
})

angular.module('translateModule', [])

.factory('Translate', function($http){

  // Values are the language codes for Google Translate
  var languageDict = {
    English: 'en',
    Chinese: 'zh-CN',
    Spanish: 'es',
    French: 'fr',
    Italian: 'it'
  };

  // Function that makes an http request to google translate
  // with the string to translate (msg) and the language to translate to (targetLang).
  // Returns a JSON object containing the results from google
  //
  // Note: sourceLang specifies the source language of msg and is not required by Google Translate
  // When sourceLang is not passed to Google Translate, Google will auto-detect the language
  // of the string to translate
  var translateMsg = function(msg, targetLang, sourceLang){
    return $http({
      method: 'GET',
      url: 'https://www.googleapis.com/language/translate/v2',
      params: {
        key: 'AIzaSyBC5v0BqpuJz6g3roho0JUkwzAX0PoR2Dk',
        target: languageDict[targetLang],
        // source: languageDict[sourceLang],
        q: msg
      }
    })
    .then(function(res){
      return res.data;
    })
  }

  return {};
  /* progenitor code
  {
    translateMsg: translateMsg
  };
  */
})