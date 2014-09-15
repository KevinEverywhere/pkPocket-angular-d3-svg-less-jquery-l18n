'use strict';

masterMapApp
  .controller('WorldMapController', ["$scope", "$rootScope", "$stateParams", function WorldMapController($scope, $rootScope, $stateParams) {
      $scope = {
        "draggable":"false",
        "data-zoom":"0" ,
        "data-type":"SATELLITE",
        "data-map-type-control":"false",
        "data-scale-control":"false"
    };
    var mapOptions = {
      zoom: 2,
      center: new google.maps.LatLng(34.397, -130.644)
    };
    $rootScope.worldMap=new google.maps.Map(document.getElementById("worldMap"), mapOptions);
}])


  .directive('childMap', function () {
    var gMapObj = {
      restrict: 'AE',
      replace:true,
      scope: true,
      controller: "WorldMapController",
      _scope: {
        "id":"@",
        "draggable":"@",
        "data-zoom":"@" ,
        "data-type":"@",
        "data-map-type-control":"@",
        "data-scale-control":"@"
      },
      // templateURL: gMapService.getMap(_scope) // getMap(_scope) // 
      template: "<div class='worldMap' id='worldMap'></div>" //MapController.getMap(scope)
    };
    return gMapObj;

  });

