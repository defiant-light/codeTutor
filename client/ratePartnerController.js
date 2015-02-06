angular.module("ratepartner", [])
.controller("ratePartnerController", function($scope, ratings) {
  $scope.rating = 5;
  // $scope.helpfulnessRating = 5;
  // $scope.knowledgeRating = 5;
  // $scope.friendlinessRating = 5;

  $scope.rateFunctionKnowledge = function(rating) {
    //var knowledgeRating = rating;
    ratings.options.knowledgeRating = rating;
    //$scope.knowledgeRating = rating;
    console.log("Rating selected - " + rating);
  };
  $scope.rateFunctionHelpfulness = function(rating) {
    //var helpfulnessRating = rating;
    ratings.options.helpfulnessRating = rating;
    $scope.helpfulnessRating = rating;
    console.log("Rating selected - " + rating);
  };
  $scope.rateFunctionFriendliness = function(rating) {
    //var friendlinessRating = rating;
    ratings.options.friendlinessRating = rating;
    $scope.friendlinessRating = rating;
    console.log("Rating selected - " + rating);
  };
  $scope.notifyRating = function() {
    console.log("Luke is awesome!");
    console.log(ratings.options);
  }
})
.directive("starRating", function() {
  return {
    restrict : "A",
    template : "<div class='rating'>" +
               "  <div ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
               "    <i class='fa fa-star'></i>" + //&#9733
               "  </div>" +
               "</div>",
    scope : {
      ratingValue : "=",
      max : "=",
      onRatingSelected : "&"
    },
    link : function(scope, elem, attrs) {
      var updateStars = function() {
        scope.stars = [];
        for ( var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : i < scope.ratingValue
          });
        }
      };
      scope.toggle = function(index) {
        scope.ratingValue = index + 1;
        scope.onRatingSelected({
          rating : index + 1
        });
      };
      scope.$watch("ratingValue", function(oldVal, newVal) {
        if (newVal) { updateStars(); }
       });
    }
  };
})
.factory('ratings', function () {
  return {
            options:{}
         };
});


