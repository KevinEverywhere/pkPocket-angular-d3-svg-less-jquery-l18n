'use strict';

masterMapApp
	.controller('SVGController', ["$scope", "$rootScope", "$stateParams", "D3Service", "LocalCRUDService",
		function SVGController($scope, $rootScope, $stateParams, D3Service, LocalCRUDService) {
			var mapClick=function(whichElement){
				console.log("SVGController.mapClick("+whichElement+")");
			}
			var d3World=D3Service, countryURL="php/countryJSONObj.php";
			if(LocalCRUDService.manageLocalCRUD('retrieve', 'd3Data')){
				d3World.d3Data=LocalCRUDService.manageLocalCRUD('retrieve', 'd3Data');
				d3World.init(d3World.defaultSVGWidth,d3World.defaultSVGHeight,"#worldDiv", "assets/d3World.fxg.svg");
			}else{
				var _LocalCRUDService=LocalCRUDService;
				d3World.d3Data=null; // d3.json("d3SVG");
				console.log("svgMap-------");
				d3.json(countryURL,function(err, d){
					if(!err){
						console.log("assets/d3World.fxg.svg-no---ERROR---");
						d3World.d3Data=d;
						_LocalCRUDService.manageLocalCRUD("create",{"key":"d3Data","value":d});
						d3World.init(d3World.defaultSVGWidth,d3World.defaultSVGHeight,"#worldDiv",
							"assets/d3World.fxg.svg");
					}else{
						console.log("assets/d3World.fxg.svg----ERROR---");
					}
				});
			}

	}])


	.directive('svgMap', function () {
		var gMapObj = {
			restrict: 'AE',
			replace:true,
			scope: {
				"eventHandler": '&ngClick'
			},
			// templateURL: gMapService.getMap(_scope) // getMap(_scope) // 
			template: "<div id='worldDiv' class='worldDiv' data-ng-click='mapClick(this)'></div>" //MapController.getMap(scope)
		};
		return gMapObj;

	});
