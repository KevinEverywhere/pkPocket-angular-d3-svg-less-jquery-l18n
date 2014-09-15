'use strict';

/*
* 
*
* (function(window, angular, undefined) {'use strict';
* var ngLocalize=angular.module('ngLocalize', []).
* })(window, window.angular);
*/

var lessNG = angular.module('lessNG', [])
	.service('lessService', ['$rootScope', function( $rootScope ) {
		var service={
			fontGroups:[
				{"name":"arial",
				"value":{
					"@theFont":"Arial",
					"@theSize":"16px",
					"@theColor":"#ccc",
					"@theWeight":"700"
				}},
				{"name":"times",
				"value":{
					"@theFont":"Times New Roman",
					"@theSize":"14px",
					"@theColor":"#Fbb",
					"@theWeight":"300"
				}},
				{"name":"courier",
				"value":{
					"@theFont":"Courier New",
					"@theSize":"16px",
					"@theColor":"#07F",
					"@theWeight":"300"
				}
			}],
			colorSchemes:[
				{"name":"default",
				"value":{
					"@bgColor":"#333",
					"@innerShadow":"#bbb",
					"@outerShadow":"multiply(@innerShadow,#aaa)",
					"@foreColor":"#fff",
					"@linkColor":"multiply(@foreColor,#ebb)",
					"@activeColor":"multiply(@foreColor,#373)",
					"@visitedColor":"#eee"
				}},
				{"name":"metallic",
				"value":{
					"@bgColor":"#CCC",
					"@innerShadow":"#444",
					"@outerShadow":"multiply(@innerShadow,#eee)",
					"@foreColor":"#000",
					"@linkColor":"multiply(@foreColor,#ebb)",
					"@activeColor":"multiply(@foreColor,#373)",
					"@visitedColor":"#300"
				}},
				{"name":"reddish",
				"value":{
					"@bgColor":"#FCC",
					"@innerShadow":"#633",
					"@outerShadow":"multiply(@innerShadow,#eee)",
					"@foreColor":"#400",
					"@linkColor":"multiply(@foreColor,#ebb)",
					"@activeColor":"multiply(@foreColor,#317)",
					"@visitedColor":"#511"
				}
			}],
			clicked:function(){
				console.log("clicked="+ arguments[0] + " and "+ arguments[1]);
			},
			setFont:function(toWhich){
				less.modifyVars(this.fontGroups[toWhich]);
			},
			setScheme:function(toWhich){
				less.modifyVars(this.colorSchemes[toWhich]);
			}
		}
		return service;
	}])
	.controller("LessCtrl",
		['$scope','lessService',
			function LessCtrl($scope, lessService){
				$scope.colorSchemes=lessService.colorSchemes;
			}
		]
	);
