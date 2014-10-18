'use strict';

var masterMapApp=angular.module("masterMapApp",  [
	'svgWorldModule',
	'mapModule',
	'weatherModule',
	'ngRoute', 
	'i18nObj',
	'localCRUD',
	'ngAnimate',
	'ui.router'
])
	.run(function ($rootScope, $state, $stateParams, $window, D3Service) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.map=null;
		$rootScope.worldMap=null;
		$rootScope.countries=[];
		$rootScope.selectedCountry=null;
		$rootScope.getCountry=function(which){
			return $rootScope.countries[which];
		};
		$rootScope.getCountryFromName=function(which, prop){
			var _which=null;
			for(var z=0;z<$rootScope.countries.length;z++){
				if($rootScope.countries[z].CountryName==which){
					_which= prop ? $rootScope.countries[z][prop] : $rootScope.countries[z];
				}
			}
			return _which;
		};
		$rootScope.hasOpened=true;
		$rootScope.interstitialized={done:false};
		var redraw=function () {
			console.log('redraw')
			D3Service.testScaling();
		};
		var updateOnlineStatus=function(event){
			console.log("masterMapApp.updateOnlineStatus");
			$rootScope.$broadcast("onlineStatusUpdate");
		}
		$window.addEventListener('orientationchange', redraw, false);
		$window.addEventListener('resize', redraw, false);
		$window.addEventListener('online', function(e) {
			console.log("masterMapApp.updateOnlineStatus");
			$rootScope.$broadcast("onlineStatusUpdate");
		}, false);
		$window.addEventListener('offline',function(e) {
			console.log("masterMapApp.updateOnFFlineStatus");
			$rootScope.$broadcast("onlineStatusUpdate");
		}, false);

	})
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
		  .state('entry', {
			url: '',
			views:{
				"googleMap":{
					templateUrl: 'views/google-map.html',		controller: 'MapController'
				},
				"main":{
					templateUrl: 'views/main.html', 			controller: 'MainCtrl'
				},
				"pageBottom":{
					templateUrl: 'views/footer.html',			controller: 'FooterCtrl'
				}
			}
		  })
		  .state('home', {
			url: '/',
			views:{
				"googleMap":{
					templateUrl: 'views/google-map.html',		controller: 'MapController'
				},
				"main":{
					templateUrl: 'views/main.html', 			controller: 'MainCtrl'
				},
				"pageBottom":{
					templateUrl: 'views/footer.html',			controller: 'FooterCtrl'
				}
			}
		  })

		  .state('country', {
			url: '/country/',
			views:{
				"googleMap":{
					templateUrl: 'views/google-map.html',		controller: 'MapController'
				},
				"main":{
					templateUrl: 'views/main.html',
					controller: 'MainCtrl'
				},
				"pageBottom":{
					templateUrl: 'views/footer.html',
					controller: 'FooterCtrl'
				}
			}
		  })
		  .state('country.detail', {
			url: ':CountryID',
			views:{
				"main":{
					templateUrl: 'views/main.html',
					controller: 'MainCtrl'
				},
				"googleMap":{
					templateUrl: 'views/google-map.html',		controller: 'MapController'
				},
				"pageBottom":{
					templateUrl: 'views/footer.html',
					controller: 'FooterCtrl'
				}
			}
		  })
		  .state('svg', {
			url: '/svg/',
			views:{
				"main":{
					templateUrl: 'views/main.html',
					controller: 'MainCtrl'
				},
				"googleMap":{
					templateUrl: 'views/svg-map.html',		controller: 'SVGController'
				},
				"pageBottom":{
					templateUrl: 'views/footer.html',
					controller: 'FooterCtrl'
				}
			}
		  })
		  .state('world', {
			url: '/world/',
			views:{
				"navBar":{
					templateUrl: 'views/navigation.html',
					controller: 'NavigationCtrl'
				},
				"googleMap":{
					templateUrl: 'views/google-world-map.html',	controller: 'WorldMapController'
				},

				"main":{
					templateUrl: 'views/main.html',
					controller: 'MainCtrl'
				},
				"pageBottom":{
					templateUrl: 'views/footer.html',
					controller: 'FooterCtrl'
				}
			}
		  })
		  .state('contact', {
			url: '/contact/',
			views:{
				/*
				"navBar":{
					templateUrl: 'views/navigation.html',
					controller: 'NavigationCtrl'
				},
				*/
				"googleMap":{
					templateUrl: 'views/google-world-map.html',	controller: 'WorldMapController'
				},
				"main":{
					templateUrl: 'views/contact.html',
					controller: 'ContactCtrl'
				},
				"pageBottom":{
					templateUrl: 'views/footer.html',
					controller: 'FooterCtrl'
				}
			}
		  });
      return $stateProvider;
    });
