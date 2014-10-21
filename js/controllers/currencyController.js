'use strict'

masterMapApp
	.service('CurrencyService', ['$rootScope', "$http", "$q", "$state", "$window",
		 function($rootScope, $http, $q, $state, $window) {
		 	var service={
		 		defaultPreferred:"USD",
		 		currentPreferred:"USD",
		 		currentCountryObj:{},
		 		currentCountry:"",
		 		currentCurrency:"",
		 		currentCurrencyName:"country...",
		 		instruments:[],
		 		instrument2s:[],
		 		primaryInstruments:[],
		 		instrumentPairs:[],
		 		displayText:'',
		 		countryCurrencyURL:"php/currencyURL.php",
		 		_exchangeURL:"php/src.php?src=",
		 		exchangeURL:function(cur1, cur2){
		 			return this._exchangeURL  + cur1 + "," + cur2;
		 		},
		 		getCurrencyData:function(whichCountry){
		 			var countryName=whichCountry,me=this;
					$http({method: 'GET', url: this.countryCurrencyURL  + "?countryName="+ countryName})
						.success(function(data, status, headers, config) {
						 	me.getCurrencyText(data.currency, data.country, data.name);
						})
						.error(function(data, status, headers, config) {
						});
		 		},
		 		getCurrencyText:function(whichCurrency, whichCountry, whichName){
		 			this.currentCountry=whichCountry;
		 			this.currentCurrency=whichCurrency;
		 			this.currentCurrencyName=whichName;
		 			if(this.currentPreferred==whichCurrency){
		 				this.getExchangeRate(this.currentPreferred, whichCurrency=="USD" ? "EUR" : "USD");
		 			}else{
		 				this.getExchangeRate(this.currentPreferred, whichCurrency);
					}
		 		},
		 		getExchangeRate:function(cur1, cur2, orOther){
		 			var me=this, _orOther=orOther, _cur1=cur1;
	 				$http
	 					.get(this.exchangeURL(cur1, cur2))
						.success(function(data, status, headers, config) {
							me.availableExchangeRate(data);
						})
						.error(function(data, status, headers, config) {
							me.unavailableExchangeRate()
						});
		 		},
		 		availableExchangeRate:function(_data){
		 			var num=0,fromCur="",toCur="";
		 			try{
		 				fromCur=_data.From;
		 				toCur=_data.To;
		 				num=_data.Rate;
			 			this.displayText=(Math.round(num*1000)/1000) + " " + toCur +  " = 1 " + fromCur;
	 				}catch(oops){
			 			this.displayText="error";
	 				}
	 				$rootScope.$broadcast("newExchangeRate",{"displayText":this.displayText});
		 		},
		 		unavailableExchangeRate:function(whichCurrency){
		 			this.displayText=" unavailable for the " +  this.currentCountry.split("+").join(" ") + " " + this.currentCurrencyName.split("+").join(" "); 
	 				$rootScope.$broadcast("newExchangeRate",{"displayText":this.displayText});
		 		},
		 		getCurrentCountry:function(){
		 			return(this.currentCountry);
		 		},
		 		setCurrentCountry:function(whichCountry){
		 			this.currentCountry=whichCountry;
		 		},
		 		setPreferred:function(whichCurrency){
		 			this.currentPreferred=whichCurrency;
		 		}
			 }
		return service;	
}])
.controller('CurrencyCtrl', 
	["$scope", "$rootScope", "$http", "$stateParams", "CurrencyService", "$window",
	function CurrencyCtrl($scope, $rootScope, $http, $stateParams, CurrencyService, $window) {
		var _CurrencyService=CurrencyService;
		$scope.displayText='';
		$rootScope.$on('newExchangeRate', function (event, data) {
			try{
				$scope.displayText=data.displayText;
			}catch(oops){
			}
		});
		$rootScope.$on('countrySelected', function (event, data) {
			try{
				_CurrencyService.getCurrencyData(data.Country.CountryName);
			}catch(oops){
			}
		});
	}
]);
