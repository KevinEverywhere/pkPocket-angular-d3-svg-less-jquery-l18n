'use strict';

var runOnce=0;

masterMapApp.controller('MainCtrl', 
	["$scope", "$rootScope", "$http", "$stateParams", "$q", "MapService", "D3Service",
	function MainCtrl($scope, $rootScope, $http, $stateParams, $q, MapService, D3Service) {
		var countries=$rootScope.countries;
 		$scope.setCountry=function (toWhich){
			$scope.countryName="";
			console.log('MapService=' + MapService)
			var cID=toWhich-1;
			MapService.getCountryData(cID);
			$scope.$broadcast("countrySelected");
			$rootScope.$broadcast("countrySelected",{Country:$rootScope.countries[cID]});
		}
 		$scope.$on('countrySelected',function(){
			$scope.countryName="";
 		});
		if($rootScope.countries.length==0){
			MapService.init($scope);
		//	D3Service.init($scope);
		}else{
			if($stateParams.CountryID){
				console.log('MainCtrl.MapService.setCountry=' +  $stateParams.CountryID)
				MapService.getCountryData($stateParams.CountryID-1);
				$rootScope.$broadcast("countrySelected",{Country:$rootScope.countries[$stateParams.CountryID-1]});
			}
		}
	}
]);
