angular.module('authentication', [])

	.controller('AuthController', function($scope, $window, $location, Auth){
		$scope.user = {name:'user'};

		$scope.signin = function(){
			Auth.signin($scope.user)
				.then(function(token) {
					$window.localStorage.setItem('com.codeTutor', token);
					$location.path('/selectsubject')
				})
				.catch(function(error) {
					console.error(error);
				})
		};

		$scope.signout = Auth.signout;
	})

	.factory('Auth', function($http, $location, $window) {
		var signin = function ( user ) {
			return $http({
				method: 'POST',
				url: '/api/users/signin',
				data: user
			})
			.then(function(resp){
				return resp.data.token;
			});
		};

		var isAuth = function(){
			return !!$window.localStorage.getItem('com.codeTutor');
		};

		var signout = function(){
			$window.localStorage.removeItem('com.codeTutor');
			$location.path('/signin');
		};

		return {
			signin: signin,
			isAuth: isAuth, 
			signout: signout
		};


	});
angular.module('mainApp',["ui.router","selectsubject","videochat", "ratepartner","authentication"
	])
	.config(function($stateProvider, $urlRouterProvider, $httpProvider){
		
    $urlRouterProvider.otherwise("/signin");

    $stateProvider
      .state('signin', {
        url:'/signin', 
        templateUrl: 'client/signin.html',
        controller: 'AuthController'
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
        templateUrl: 'client/ratePartner.html'
      });

      $httpProvider.interceptors.push('AttachTokens');
	})
  .factory('video', function () {
    return {options:null};
  })
  .factory('AttachTokens',function($window){
    var attach = {
      request: function(object){
        var jwt = $window.localStorage.getItem('com.codeTutor');
        if(jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
  .run(function ($rootScope, $location, $state, Auth) {
    Auth.signout();
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){
      if(toState.name !== 'signin' && !Auth.isAuth()){
        $state.transitionTo('signin');
        event.preventDefault();
      }
    });
  });


angular.module("ratepartner", [])
.controller("ratePartnerController", function($scope, $http, ratings) {
  $scope.rating = 5;
  // $scope.helpfulnessRating = 5;
  // $scope.knowledgeRating = 5;
  // $scope.friendlinessRating = 5;

  $scope.rateFunctionKnowledge = function(rating) {
    //var knowledgeRating = rating;
    ratings.options.knowledgeRating = rating;
    //$scope.knowledgeRating = rating;
    console.log("Rating selected - " + rating);
  };
  $scope.rateFunctionHelpfulness = function(rating) {
    //var helpfulnessRating = rating;
    ratings.options.helpfulnessRating = rating;
    //$scope.helpfulnessRating = rating;
    console.log("Rating selected - " + rating);
  };
  $scope.rateFunctionFriendliness = function(rating) {
    //var friendlinessRating = rating;
    ratings.options.friendlinessRating = rating;
    //$scope.friendlinessRating = rating;
    console.log("Rating selected - " + rating);
  };

  $scope.notifyRating = function() {
    console.log("Luke is awesome!");
    console.log(ratings.options);
    return $http({
      method: 'POST',
      url: '/api/ratepartner',
      data: ratings
    })
    .success(function(data){
      console.log(data);
    })
  }

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
})
.factory('ratings', function () {
  return {
            options:{}
         };
});



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
.controller('videoChatController', function($scope, $http, video) {
  console.log(video);
  console.log(video.options);
  
  //load the video with the options, if they're not null
  
  $scope.disconnect = function(){
    console.log('disconnecting');
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