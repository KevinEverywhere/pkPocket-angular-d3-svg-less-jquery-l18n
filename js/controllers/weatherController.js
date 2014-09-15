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
			console.log('weather weatherUpdate=' + data.country);
			try{
				for(var z in data){
					_scope[z]=data[z];
				}
				console.log("weatherUpdate made")
				//	$rootScope.countries[data.Country.CountryID-1], _scope);
					// {"Capital":data.Country.Capital, 
			}catch(oops){
				console.log("bad call from WeatherCtrl data=" + data);
			}
		});

		$rootScope.$on('countrySelected', function (event, data) {
			console.log($rootScope.countries[data.Country.CountryID-1].Capital + ' is cuontries.Capital, inside weather controller=' + data.Country.CountryName);
			try{
				_WeatherService.lookupWeather({"Capital":$rootScope.countries[data.Country.CountryID-1].Capital,
					"CountryName": $rootScope.countries[data.Country.CountryID-1].CountryName}, _scope);
				//	$rootScope.countries[data.Country.CountryID-1], _scope);
					// {"Capital":data.Country.Capital, 
			}catch(oops){
				console.log("bad call from WeatherCtrl data=" + data);
			}
		});
	//	WeatherService.init();
	}
]);
