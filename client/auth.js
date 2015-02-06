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