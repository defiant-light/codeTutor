angular.module('mainApp',["ui.router","selectsubject","videochat"
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
        templateUrl: 'client/ratePartner.html'
      })
	})
.service('video', function () {
  return {video:"Left Shark"};
});
