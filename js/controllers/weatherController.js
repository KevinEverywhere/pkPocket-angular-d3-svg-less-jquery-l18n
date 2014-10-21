'use strict'

var runOnce=0;

masterMapApp.controller('WeatherCtrl', 
	["$scope", "$rootScope", "$http", "$stateParams", "WeatherService",
	function WeatherCtrl($scope, $rootScope, $http, $stateParams, WeatherService) {
		$scope.country="";
		$scope.city="";
		$scope.observation_time="";
		$scope.weather="";
		$scope.relative_humidity="";
		$scope.temp_c="";
		var _WeatherService=WeatherService;
		var _scope=$scope;
 		$rootScope.$on("weatherUpdate",function (event, data) {
			try{
				for(var z in data){
					_scope[z]=data[z];
				}
			}catch(oops){}
		});

		$rootScope.$on('countrySelected', function (event, data) {
			try{
				_WeatherService.lookupWeather({
					"Capital":$rootScope.countries[data.Country.CountryID].Capital,
					"CountryName": $rootScope.countries[data.Country.CountryID].CountryName
				}, 
				_scope);
			}catch(oops){}
		});
	}
]);
