'use strict';

masterMapApp.controller('TranslateController', 
	["$scope", "$rootScope", "$http", "$stateParams", "$window",
	function TranslateController($scope, $rootScope, $http, $stateParams, $window) {
		function updateOnlineStatus(){
			$scope.onLine=$window.navigator.onLine;
		}
 		$rootScope.$on('onlineStatusUpdate',function(){
			updateOnlineStatus();
 		});
		updateOnlineStatus();
	}
]);

