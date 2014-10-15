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
		 			console.log("getCurrencyData=" + whichCountry);
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
		 		getAnyInstrument:function(whichCurrency){
		 			var ret=[];
		 			for(var z in this.instrumentPairs){
		 				try{
			 				if(z.indexOf(whichCurrency)!=-1 && z.length>5){
			 					ret=[z.substring(0,3),z.substring(4,7)];
			 					console.log("inside get = " + z + ":" + ret[0] + "; and " + ret[1]);
			 					break;
			 				}
		 				}catch(oops){}
		 			}
		 			return ret;
		 		},
		 		parseInstruments:function(_array){
		 			for(var ind=0;ind<_array.length;ind++){
		 				var inst1=_array[ind].instrument.substring(0,3);
		 				var inst2=_array[ind].instrument.substring(4,7);
		 				if(!this.instrumentPairs[_array[ind].instrument]){
		 					this.instrumentPairs[
			 					this.instrumentPairs.length]=
			 						this.instrumentPairs[_array[ind].instrument]=
			 						{code:_array[ind].instrument};
		 				}
		 				if(!this.instruments[inst1]){
		 					this.primaryInstruments[this.primaryInstruments.length]=this.primaryInstruments[inst1]= {code:inst1};
		 					this.instruments[this.instruments.length]=this.instruments[inst1]={code:inst1};
		 				}
		 				if(!this.instrument2s[inst2]){
		 					this.instrument2s[this.instrument2s.length]=this.instrument2s[inst2]={code:inst2};
		 				}
		 			}
		 		},
		 		availableExchangeRate:function(_data){
		 			var num=0,fromCur="",toCur="";
		 			try{
		 				fromCur=_data.From;
		 				toCur=_data.To;
		 				num=_data.Rate;
		 				/*  OANDA
			 			fromCur=_data.prices[0].instrument.substring(0,3);
			 			toCur=_data.prices[0].instrument.substring(4,7);
			 			if(_data && _data.prices && _data.prices[0]){
			 					num=(_data.prices[0].bid ? (_data.prices[0].ask ? 
			 						((_data.prices[0].bid + _data.prices[0].ask)/2) : _data.prices[0].bid
			 						) : _data.prices[0].ask
			 					)
			 			}
			 			*/
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
		 		},
		 		getInstrumentsList:function(){
		 			/*
		 			var me=this;
		 			console.log("getInstrumentsList");
	 				$http.get(this.instrumentURL).
						success(function(data, status, headers, config) {
							me.parseInstruments(data.instruments);
						}).
						error(function(data, status, headers, config) {
							console.log("ERROR in instrument list");
						});
*/
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
				console.log("bad displayText data=" + data);
			}
		});
		$rootScope.$on('countrySelected', function (event, data) {
		//	
		try{
			_CurrencyService.getCurrencyData(data.Country.CountryName);
		}catch(oops){
			console.log("bad data=" + data);
		}

		});
	}
]);

/*		 		

instrument": "AUD_CAD",
      "displayName

	OANDA.rate.quote(['EUR_USD'], function(response) {
    if(response && !response.error) {
        var bid = response.prices[0].bid;
        var ask = response.prices[0].ask;
        // Do something with prices
        // ...
*/
	    
