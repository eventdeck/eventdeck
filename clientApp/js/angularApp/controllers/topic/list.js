'use strict';

theToolController.controller('TopicController', function ($scope, $location, TopicFactory) {

  //================================INITIALIZATION================================

  $scope.loading = true;

  $scope.kinds = ["Info", "To do", "Decision", "Idea"];

  init();

  function init() {
    setTimeout(function() {
      if ($scope.loading) {
        init();
      }
    }, 1000);

    MeetingFactory.getAll(function(topics) {
      $scope.topics = topics;

      for (var i = 0, j = $scope.topics.length; i < j; i++) {
        $scope.topics[i].facebook = $scope.members.filter(function(o) {
          return $scope.topics[i].author == o.id;
        })[0].facebook;
      }

      $scope.loading = false;
    });
  }


  //===================================FUNCTIONS===================================

  $scope.time = function(date) {
    return $scope.timeSince(new Date(date));
  };

  $scope.createTopic = function() {
    var date = new Date();

    TopicFactory.create({
      author: $scope.me.id,
      kind: $scope.kind
    }, function(response) {
      console.log(response);
      if (response.success) {
        $location.path("/topic/" + response._id + "/edit");
      }
    });
  };

});
