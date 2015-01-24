angular.module('languageApp', [])

.controller('selectLanguageController', function($scope, $http) {
  $scope.languages = ['english','chinese','spanish','french','italian'];
  $scope.language = {};

  $scope.submitLanguages = function(languageSelections){
    return $http({
      method: 'GET',
      url: '/api/getroom',
      params: languageSelections
    })
    .success(function(data){
      var comm = new Icecomm('IbQqKDNCGQS7b94Mllk/iHOJbeSe/UrJJy6l1BbqEbP0fKaK');

      comm.connect(data);

      comm.on('local', function(options) {
        localVideo.src = options.stream;
      });

      comm.on('connected', function(options) {
        document.body.appendChild(options.video);
      });

      comm.on('disconnect', function(options) {
        document.getElementById(options.callerID).remove();
      });
    })
  }
})