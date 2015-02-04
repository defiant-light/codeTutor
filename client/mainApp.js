angular.module('mainApp',["ui.router"
	])
	.config(function($stateProvider, $urlRouterProvider){
		
    $urlRouterProvider.otherwise("/state1");

    $stateProvider
	    .state('signup', {
        url:'/signup',
        templateUrl: 'client/signup.html'
      })
      .state('signin', {
        url:'/signin', 
        templateUrl: 'client/signin.html'
      })
			.state('videochat', {
        url:'/videochat',
        templateUrl: 'client/videoChat.html'
      })
      .state('selectsubject', {
        url:'/selectsubject', 
        templateUrl: 'client/selectSubject.html'
      })
			.state('ratepartner', {
        url:'/ratepartner',
        templateUrl: 'client/ratePartner.html'
      })

	});
