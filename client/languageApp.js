angular.module('languageApp', [])

.controller('selectLanguageController', function($scope, $http) {
  $scope.languages = ['english','chinese','spanish','french','italian'];
  $scope.language = {};

  $scope.submitLanguages = function(languageSelections){
    return $http({
      method: 'GET',
      url: '/api/getroom',
      data: languageSelections
    })
  }
})