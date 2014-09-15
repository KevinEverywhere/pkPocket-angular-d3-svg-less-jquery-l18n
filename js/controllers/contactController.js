'use strict';

 masterMapApp
  .controller('ContactCtrl', function ($scope) {
  	$scope.home = "Home";
  	$scope.work = "Work";
  	$scope.media = "Media";
  	$scope.links = "Links";
  	$scope.contact = "Contact";
    $scope.helpTopics = [
      'Mongo',
      'Express',
      'AngularJS',
      'Node'
    ];
  });
