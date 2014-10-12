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
 		$rootScope.$on('countrySelected',function(obj){
 			var a="", b=obj.targetScope;
// 			for(var c in b){
 //				a+=c+":" + b[c] +"; "; 
 	//		}
			$scope.countryName="";
			console.log('obj.Country. a=' + a); // .Country.CountryID);
	//		MapService.getCountryData(obj.Country.CountryID);
		//	$scope.$broadcast("countrySelected");
 		});
		if($rootScope.countries.length==0){
			MapService.init($scope);
		//	D3Service.init($scope);
		}else{
			if($stateParams.CountryID){
				console.log('MainCtrl.MapService.setCountry=' +  $stateParams.CountryID)
				MapService.getCountryData($stateParams.CountryID);
				$rootScope.$broadcast("countrySelected",{Country:$rootScope.countries[$stateParams.CountryID]});
			}
		}
	}
]);

