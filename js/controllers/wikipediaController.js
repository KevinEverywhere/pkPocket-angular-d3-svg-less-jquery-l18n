'use strict'

masterMapApp
	.service('WikipediaService', ['$rootScope', "$http", "$q", "$state", "$window",
		 function($rootScope, $http, $q, $state, $window) {
		 	var service={
		 		displayText:'',
		 		wikipediaURL:"php/currencyURL.php",
		 		_wikiURL:"php/src.php?src=wiki&wiki=",
		 		wikiURLOpen:"http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=",
		 		wikiURLClose:"?callback=JSON_CALLBACK",
		 		wikiURL:function(what){
		 			return this.wikiURLOpen  + what;
		 //			return this._wikiURL  + what;
		 		},


		 		getWikiInfo:function(onWhat){
		 			var me=this;
				 	$http.jsonp(this.wikiURL(onWhat))
						.success(function(data, status, headers, config) {
							var obj=JSON.parse(data);
							console.log("getWikiInfo=; ...");
							$window.wikipedia=obj;
							console.log("data.query="  + obj.query);
							me.displayText="obj.query=" + obj.query;
						})
						.error(function(data, status, headers, config) {
							console.log("ERROR=" + data)
						});
		 		}
			 }
		return service;	
}])
.controller('WikipediaCtrl', 
	["$scope", "$rootScope", "$http", "$stateParams", "WikipediaService", "$window",
	function WikipediaCtrl($scope, $rootScope, $http, $stateParams, WikipediaService, $window) {
		var _WikipediaService=WikipediaService;
		$rootScope.$on('countrySelected', function (event, data) {
			console.log('WikipediaCtrl.countrySelected...')
			try{
				_WikipediaService.getWikiInfo(data.Country.CountryName);
			}catch(oops){
				console.log("bad data=" + data);
			}
		});
	}
]);
