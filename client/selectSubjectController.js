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
