angular.module('signin', [])
.controller('signinController', function($scope, $http) {

	$scope.makeUsers = function(value){
  	return $http({
      method: 'POST',
      url: '/userlogin',
      data: value
    })
    .success(function(data){
      console.log('USERS!');
    })
  }
}; 



