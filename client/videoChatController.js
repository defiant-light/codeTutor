angular.module('videochat', [])
.controller('videoChatController', function($scope,video) {
  angular.extend($scope,video);
  console.log(video);
  console.log($scope.video);
});