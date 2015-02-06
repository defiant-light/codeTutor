<<<<<<< HEAD
angular.module('mainApp',["ui.router","selectsubject", "ratepartner"
=======

angular.module('mainApp',["ui.router","selectsubject","videochat", "ratepartner"
>>>>>>> b12e816031493bff723588b5c247d47569bb79b8
	])
	.config(function($stateProvider, $urlRouterProvider){
		
    $urlRouterProvider.otherwise("/signin");

    $stateProvider
      .state('signin', {
        url:'/signin', 
        templateUrl: 'client/signin.html'
      })
      .state('selectsubject', {
        url:'/selectsubject', 
        templateUrl: 'client/selectSubject.html'
      })
			.state('videochat', {
        url:'/videochat',
        templateUrl: 'client/videoChat.html'
      })
			.state('ratepartner', {
        url:'/ratepartner',
        templateUrl: 'client/ratepartner.html'
      })

      // .state('logout', {
      //   url: '/signin', 
      //   templateUrl: 'client/signin.html'
      // })
      
	});
	})
.factory('video', function () {
  return {options:null};
});


//angular.module('ratepartner',[]).controller('RatingCtrl', function ($scope) {
  //console.log("this is my RatingCtrl");

angular.module('codeTutorApp', ['ui.bootstrap']).controller('RatingDemoCtrl', function ($scope) {

  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = false;

<<<<<<< HEAD
angular.module("ratepartner", [])
.controller("ratePartnerController", function($scope) {
  $scope.rating = 5;
  $scope.rateFunction = function(rating) {
    console.log("Rating selected - " + rating);
  };
})
.directive("starRating", function() {
  return {
    restrict : "A",
    template : "<div class='rating'>" +
               "  <div ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
               "    <i class='fa fa-star'></i>" + //&#9733
               "  </div>" +
               "</div>",
    scope : {
      ratingValue : "=",
      max : "=",
      onRatingSelected : "&"
    },
    link : function(scope, elem, attrs) {
      var updateStars = function() {
        scope.stars = [];
        for ( var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : i < scope.ratingValue
          });
        }
      };
      scope.toggle = function(index) {
        scope.ratingValue = index + 1;
        scope.onRatingSelected({
          rating : index + 1
        });
      };
      scope.$watch("ratingValue", function(oldVal, newVal) {
        if (newVal) { updateStars(); }
      });
    }
  };
});



// angular.module('FundooDirectiveTutorial', [])
//   .controller('FundooCtrl', function($scope, $window) {
//     $scope.rating = 5;
//     $scope.saveRatingToServer = function(rating) {
//       $window.alert('Rating selected - ' + rating);
//     };
//   })
//   .directive('fundooRating', function () {
//     return {
//       restrict: 'A',
//       template: '<ul class="rating">' +
//                   '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
//                     '\u2605' +
//                   '</li>' +
//                 '</ul>',
//       scope: {
//         ratingValue: '=',
//         max: '=',
//         readonly: '@',
//         onRatingSelected: '&'
//       },
//       link: function (scope, elem, attrs) {

//         var updateStars = function() {
//           scope.stars = [];
//           for (var  i = 0; i < scope.max; i++) {
//             scope.stars.push({filled: i < scope.ratingValue});
//           }
//         };

//         scope.toggle = function(index) {
//           if (scope.readonly && scope.readonly === 'true') {
//             return;
//           }
//           scope.ratingValue = index + 1;
//           scope.onRatingSelected({rating: index + 1});
//         };

//         scope.$watch('ratingValue', function(oldVal, newVal) {
//           if (newVal) {
//             updateStars();
//           }
//         });
//       }
//     }
//   });

// http://www.befundoo.com/university/tutorials/angularjs-directives-tutorial/
angular.module('selectsubject', ['translateModule', 'ngFx'])
.controller('selectSubjectController', function($scope, $http, Translate) {
  console.log("is this even being loaded?");
  $scope.languages = [['Javascript','us'],['Python','cn'],['Algebra','es'],['Geometry','fr'],['SQL','it']];
  $scope.levels = [["Expert",10],["Experienced",8],["Intermediate",6],["Beginner",4],["Novice",2]];
=======
  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];

});

//});

angular.module('selectsubject', [])
.controller('selectSubjectController', function($scope, video) {
  $scope.subjects = [
    ['Javascript','us'],
    ['Python','cn'],
    ['Algebra','es'],
    ['Geometry','fr'],
    ['SQL','it']
  ];
  $scope.levels = [
    ["Expert",10],
    ["Experienced",8],
    ["Intermediate",6],
    ["Beginner",4],
    ["Novice",2]
  ];
>>>>>>> b12e816031493bff723588b5c247d47569bb79b8
  $scope.estimates=[
    ["More than 1 hour",60],
    ["More than 30 minutes",30],
    ["More than 15 minutes",15],
    ["More than 7 minutes",7],
    ["More than 3 minutes",3],
    ["More than 1 minute",1],
    ["Less than 1 minute",0]
    ];
  $scope.options = {};
  //my god we have done it
  video.options=$scope.options;
});


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
  
});