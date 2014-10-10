'use strict'

masterMapApp
	.service('WikipediaService', ['$rootScope', "$http", "$q", "$state", "$window",
		 function($rootScope, $http, $q, $state, $window) {
		 	var service={
		 		displayText:'',
		 		wikiURLOpen:"http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=",
		 		wikiURLClose:"&callback=JSON_CALLBACK",
		 		wikiURL:function(what){
		 			return this.wikiURLOpen  + what + this.wikiURLClose;
		 		},
		 		getWikiInfo:function(onWhat, whichScope){
		 			var me=this;
					console.log("getWikiInfo on " + this.wikiURL(onWhat));
				 	$http.jsonp(this.wikiURL(onWhat))
						.success(function(data) {
							//	This code is written to reduce the size of the wikipedia data.
							// 	A smaller dataset from Wikipedia or other URL would help.
							var piece="",_content="",_title="",o={}, y=data.query.pages;for(var z in y){o=y[z]};_title=o.title;_content=o.revisions[0]["*"];
							_content=_content.substring(_content.indexOf("'''"), _content.indexOf("==Etymology=="));
							whichScope.displayText=_content;
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
		$rootScope.$on('countrySelected', function (event, data) {
			WikipediaService.getWikiInfo(data.Country.CountryName, $scope);
		});
	}
]);

function spy(haystack, thing){
	var rtn=null,num=0;
	for(var needle in haystack){
		num++;
		if(needle==thing){
			rtn=haystack[needle];
		}
	}
	if(rtn==null){
		if(num==0){
			return spy()
		}
	}
}