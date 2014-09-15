'use strict';

var weatherModule = angular.module('weatherModule', [])
		.service('WeatherService', ['$rootScope', "$http", "$q", "$state", "$window",
		 function($rootScope, $http, $q, $state, $window) {
			var service={
				isInterested:false,
				wuAPI:"http://api.wunderground.com/api/",
				wuKey:'7dbc96b08ac7c32d',
				wuURL:"php/src.php?met=1&src=",
				wuLookUp:function(what){
					return this.wuAPI + this.wuKey + "/geolookup/conditions/forecast/q/" + what + ".json" + "?callback=JSON_CALLBACK";
				},
				getInterest:function(){
					return ($rootScope.weatherToggle);
				},
				weatherLookups:[],
				currentLookup:-1,
				lookupWeather:function(obj, _scope){
					if(this.getInterest()==true){
						var scope=_scope;
						var parsedObj=obj.CountryName.split("+").join(" ") + "/" + obj.Capital.split("+").join(" ");
					 	$http.jsonp(this.wuLookUp(parsedObj)) 
					 	.success(function(data, status, headers, config) {
					 		try{
					 			if(data.current_observation){
									scope.city=data.current_observation.display_location.city;
									scope.country=data.current_observation.display_location.country;
									scope.weather=data.current_observation.weather;
									scope.relative_humidity=data.current_observation.relative_humidity;
									scope.temp_c=data.current_observation.temp_c;
									scope.observation_time=data.current_observation.observation_time_rfc822;
								}else{
									scope.city= (data.response.results.city ? data.response.results.city : 
										((data.response.results[0] && data.response.results[0].city) ? data.response.results[0].city : "Unknown city"))
									scope.country= (data.response.results.country ? data.response.results.country_name : 
										((data.response.results[0] && data.response.results[0].country_name) ? data.response.results[0].country_name : "Unknown country"))
								}
						 		$rootScope.$broadcast("weatherUpdate",scope);
					 		}catch(oops){
					 			console.log('bad weather scopage');
					 		}
					 		$window.weather=data;
					 		console.log("weather=" + data);
					 	})
					 	.error(function(data, status, headers, config) {
					 		console.log("weather.error=" + data);
					 	})
					}
				},
				testLookupWeather:function(){
					//
				},
				init:function(objToLookup){
			//		var countriesURL="../countryJSONObj.php";
					console.log('inited weatherModule!!');
					// this.lookupWeather({"Capital":"London","CountryName":"United Kingdom"});
				},
				_create:function(what){
					
				}
			}
			return service;
		}])
		.controller("WControl",
			["$scope", "$rootScope", "$http", "$stateParams", "$q", "WeatherService",
				function WControl($scope, $rootScope, $http, $stateParams, $q, WeatherService){
				}
			]
		);


