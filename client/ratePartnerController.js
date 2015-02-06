angular.module("ratepartner", [])
.controller("ratePartnerController", function($scope) {
  $scope.rating = 5;
  $scope.rateFunctionKnowledge = function(rating) {
    var knowledgeRating = rating;
    // console.log("Rating selected - " + rating);
    console.log(knowledgeRating + " stars knowledgeable")
  };
  $scope.rateFunctionHelpfulness = function(rating) {
    var helpfulnessRating = rating;
    // console.log("Rating selected - " + rating);
    console.log(helpfulnessRating + " stars helpful")
  };
  $scope.rateFunctionFriendliness = function(rating) {
    var friendlinessRating = rating;
    // console.log("Rating selected - " + rating);
    console.log(friendlinessRating + " stars friendly")
  };
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
});


