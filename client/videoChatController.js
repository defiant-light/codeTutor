angular.module('videochat', [])
.controller('videoChatController', function($scope,$http,video) {
  console.log(video);
  console.log(video.options);
  
  //load the video with the options, if they're not null
  
  $scope.disconnect = function(){
    console.log('disconecting');
    $scope.comm.close();
  }

  $scope.submitLanguages = function(languageSelections){
    $scope.video=$scope.language;
    console.log(languageSelections);
    $scope.showingVideo=true;

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
  
  if (video.options && video.options.subject){
    $scope.submitLanguages(video.options);
  }
  
  // $scope.takePic = function() {
  //   var streaming = false,
  //       video        = document.querySelector('#video'),
  //       cover        = document.querySelector('#cover'),
  //       canvas       = document.querySelector('#canvas'),
  //       photo        = document.querySelector('#photo'),
  //       startbutton  = document.querySelector('#startbutton'),
  //       width = 200,
  //       height = 0;

  //   navigator.getMedia = ( navigator.getUserMedia || 
  //                          navigator.webkitGetUserMedia ||
  //                          navigator.mozGetUserMedia ||
  //                          navigator.msGetUserMedia);

  //   navigator.getMedia(
  //     { 
  //       video: true, 
  //       audio: false 
  //     },
  //     function(stream) {
  //       if (navigator.mozGetUserMedia) { 
  //         video.mozSrcObject = stream;
  //       } else {
  //         var vendorURL = window.URL || window.webkitURL;
  //         video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
  //       }
  //       video.play();
  //     },
  //     function(err) {
  //       console.log("An error occured! " + err);
  //     }
  //   );

  //   video.addEventListener('canplay', function(ev){
  //     if (!streaming) {
  //       height = video.videoHeight / (video.videoWidth/width);
  //       video.setAttribute('width', width);
  //       video.setAttribute('height', height);
  //       canvas.setAttribute('width', width);
  //       canvas.setAttribute('height', height);
  //       streaming = true;
  //     }
  //   }, false);

  //   function takepicture() {
  //     canvas.width = width;
  //     canvas.height = height;
  //     canvas.getContext('2d').drawImage(video, 0, 0, width, height);
  //     var data = canvas.toDataURL('image/png');
  //     photo.setAttribute('src', data);
  //   }

  //   startbutton.addEventListener('click', function(ev){
  //       takepicture();
  //     ev.preventDefault();
  //   }, false);
  // }();

});