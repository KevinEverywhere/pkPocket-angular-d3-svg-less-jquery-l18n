'use strict';

/*
 * An AngularJS Object-Based Localization Service
 *
 * Written by Kevin Ready, inspired and borrowed from Jim Lavin http://codingsmackdown.tv
 *
 *
 */
var counter=0;
var i18nObj=angular.module('i18nObj', []).
    factory('i18nObjFactory', ['$http', '$rootScope', '$window', '$filter', 
		function ($http, $rootScope, $window, $filter) {
			var factory = {
				_lang:'',
				defaultBadText: '',
				defaultSourceURL: 'js/i18n/locale_en.json',
				lang:function(){
					return $window.navigator.userLanguage || $window.navigator.language
				},
				sourceFiles:[],
				source:{},
				getSource:function(whichURL){
					if(this.source[whichURL]){
						return this.source[whichURL];
					}else{
						return [];
					};
				},
				setLoaded:function(whichURL, toWhat){
					this.sourceFiles[whichURL]=toWhat;
				},
				setSource:function(whichURL, whichSource){
					this.source[whichURL]=whichSource;
				},
				lang2:function () {
					return(this.lang().substring(0,2));
				},
				findChildObjString:function(data, object, property, subProp, subPropProp){
					if(typeof(data[property])=="string"){
						return(data[property]);
					}else if((typeof(data[property])=="object") && subProp && subPropProp){
						return(data[property][subProp][subPropProp]);
					}else if((typeof(data[property])=="object") && subProp){
						return(data[property][subProp]);
					}else{
						return "--";
					}
				},
				initLCLSource:function (url) {
					$http({ method:"GET", url:url, cache:false })
					.success(function (data) {
						factory.setSource(url, data);
						factory.setLoaded(url, true);
						$rootScope.$broadcast('factorySourcesUpdates');
					}).error(function () {
						if(! factory.source){
							url=factory.defaultSourceURL;
							$http({ method:"GET", url:url, cache:false })
							.success(function (data) {
								factory.setSource(url, data);
								factory.setLoaded(url, true);
								$rootScope.$broadcast('factorySourcesUpdates');
							})
						}
					});
				},
				isLoaded:function (whichURL) {
					return(this.sourceFiles[whichURL]);
				},
				getLCLObjString:function (args) {
					var file=args[0];
					var object=args[1];
					var property=args[2];
					var subProp= (args.length>3) ? args[3] : "";
					var subPropProp = (args.length>4) ? args[4] : "";
					var result = '',
					url = 'js/i18n/' + file + "_" + this.lang2() + '.json';
					if (factory.getSource(url).length==0 && ! factory.isLoaded(url)) {
						factory.initLCLSource(url);
						// set the flag to keep from looping in init
						factory.setLoaded(url,true);
						// return the empty string
						return result;
					}
					if (factory.source !== []) {
						var entry = $filter('filter')(factory.getSource(url),{key:object})[0];
						// check to make sure we have a valid entry
						if ((entry !== null) && (entry != undefined)) {
							if(typeof(entry.value) == "string"){
								result = entry.value;
							}else{
								result=this.findChildObjString(entry.value,object, property, subProp, subPropProp);
							}
						}
					}
					return(result);
				// return the value to the call
				}
			};
			// return the local instance when called
			return factory;
		} 
		
	]
)

    .filter('i18nObj', ['i18nObjFactory', function (factory) {
		return function (file) {
			return factory.getLCLObjString(arguments);
		};
	}])
;

