var runOnce=0;

masterMapApp.controller('BodyController', 
	["$scope", "$rootScope", "$http", "$stateParams", "CurrencyService", "$document",
	function BodyController($scope, $rootScope, $http, $stateParams, CurrencyService, $document) {
		function init(){
	 		$scope.isLoaded=true;
	 		$scope.countryToggle=true;
	 		$scope.translateToggle=false;
	 		$scope.currencyToggle=false;
			$rootScope.hasOpened=true;
	 		$rootScope.weatherToggle=false;
	 	}
 		$scope.$on('svgLoaded',function(){
 			$scope.isLoaded=true;
 			$scope.$parent.isLoaded=true;
 		});
 		$rootScope.$on('enoughLoaded',function(){
			$("#masterMapApp").css("opacity","1");
//			$("body").css("opacity","1");
			console.log("masterMapApp enoughLoaded OPACIT SET initWorld");
 		});
 		$scope.$on('countrySelected',function(countryObj){
 			if($rootScope.hasOpened==false){
 				$rootScope.hasOpened=true;
	 			$scope.countryToggle=true;
 			}
 			$scope.countrySelected=true;
 		});
 		init();
	}
]);
