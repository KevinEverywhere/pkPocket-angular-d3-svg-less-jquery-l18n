'use strict';

var runOnce=0;

masterMapApp.controller('MainCtrl', 
	["$scope", "$rootScope", "$http", "$stateParams", "$q", "MapService", "D3Service",
	function MainCtrl($scope, $rootScope, $http, $stateParams, $q, MapService, D3Service) {
		var countries=$rootScope.countries;
 		$scope.setCountry=function (cID){
			MapService.getCountryData(cID);
			$rootScope.$broadcast("countrySelected",{Country:$rootScope.countries[cID]});
		}
 		$scope.$on('countrySelected',function(){
			$scope.countryName="";
		});
 		$rootScope.$on('countrySelected',function(evt, obj){
			MapService.getCountryData(obj.Country.CountryID);
 			D3Service.swapHighlights(obj.Country);
			$scope.$broadcast("countrySelected");
 		});
		if($rootScope.countries.length==0){
			MapService.init($scope);
		}else{
			if($stateParams.CountryID){
				MapService.getCountryData($stateParams.CountryID);
				$rootScope.$broadcast("countrySelected",{Country:$rootScope.countries[$stateParams.CountryID]});
			}
		}
	}
]);

