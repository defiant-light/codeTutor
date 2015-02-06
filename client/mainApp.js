angular.module('mainApp',["ui.router","selectsubject","authentication"
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
