angular.module('mainApp',["ui.router"
	])
	.config(function($stateProvider, $urlRouterProvider){
		
    $urlRouterProvider.otherwise("/state1");

    $stateProvider
			.state('state1', {
        url:'/state1',
        templateUrl: 'client/test.html'
      })
      .state('state2', {
        url:'/state2', 
        templateUrl: 'client/test2.html'
      })
	});
