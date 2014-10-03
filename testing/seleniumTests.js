//		Selenium tests for the PK Pocket Edition App. This enters
//		five (5) country names to view browser display reaction. To use:
//
//		npm install selenium-webdriver
//		node seleniumTests.js

(function(whichBrowser){
	var timer=5000;
	var resizeWindow=function(w, h){
		driver.manage().window().setSize(w, h)
	}
	var windowSizes=[
		[1024, 768, "Standard tablet landscape"],
		[768, 1024, "Standard tablet portrait"],
		[667, 375, "iPhone 6 / pixel-halved landscape"],
		[960, 540, "iPhone 6 Plus / pixel-halved landscape"],
		[375, 667, "iPhone 6 / pixel-halved portrait"]
	];
	var testURL='http://www.planetkevin.com/angular/';		// Put your own URL here.
	var webdriver = require('selenium-webdriver');
	var driver = new webdriver.Builder().withCapabilities(
		webdriver.Capabilities[whichBrowser]()
	).build();
	var timeout=function(ms) {
		var d = webdriver.promise.defer();
		var start = Date.now();
		setTimeout(function() {
			d.fulfill(Date.now() - start);
		}, ms);
		return d.promise;
	}
	var browserTest={
		init:function(){
			this.countryArray=[{
				countryName:"Hungary",
				currency:"HUF"
			},{
				countryName:"Russia",
				currency:"RUB"
			},{
				countryName:"Japan",
				currency:"JPY"
			},{
				countryName:"India",
				currency:"INR"
			},{
				countryName:"Brazil",
				currency:"BRL"
			}];
			this.currentTestCountry=0;
			driver.get(testURL).then(this.beginAppTesting);
		},
		getCurrentCountry:function(){
			return browserTest.countryArray[browserTest.currentTestCountry];
		},
		beginAppTesting:function() {
			console.log("App Testing... Preparing for window size and country selection tests. ");
			timeout(timer).then(browserTest.checkPage);
		},
		checkPage:function(ms) {
			console.log("Resizing window for " + windowSizes[browserTest.currentTestCountry][2]);
			resizeWindow(
				windowSizes[browserTest.currentTestCountry][0],
				windowSizes[browserTest.currentTestCountry][1]
			);
			console.log("Page will change layout in "+ms+" milliseconds.");
			driver.findElement(webdriver.By.name('countryName'))
			.then(browserTest.enterCountryName)
			.then(browserTest.selectCountryName)
			.then(browserTest.selectCountryCurr)
			.then(browserTest.sayFinished)
			.then(null, function(err) {
				console.error("An error was thrown! " + err);
			});
		},
		enterCountryName:function(inputElem) {
			console.log("country name entered "+browserTest.getCurrentCountry().countryName);
			return inputElem.sendKeys(browserTest.getCurrentCountry().countryName);
		},

		selectCountryName:function() {
			console.log("country name selected "+browserTest.getCurrentCountry().countryName);
			driver.findElement(webdriver.By.id(browserTest.getCurrentCountry().countryName)).click();
		},
		selectCountryCurr:function(z) {
			if(browserTest.currentTestCountry==0){
				console.log("country currency "+browserTest.getCurrentCountry().currency);
				driver.findElement(webdriver.By.id("currencyHeader")).click();
			}
		},
		sayFinished:function(){
			browserTest.currentTestCountry++;
			if(browserTest.currentTestCountry<browserTest.countryArray.length){
				console.log("sayFinished");
				timeout(timer).then(browserTest.checkPage);
			}else{
				console.log("say REALLY Finished");
			}
		},
	}
	browserTest.init();
})("chrome"); // Currently, only chrome and firefox are valid values.
