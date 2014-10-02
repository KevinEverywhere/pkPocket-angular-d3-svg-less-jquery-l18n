var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

var testAssocArray=[{
	countryName:"Hungary",
	currency:"HUF"
}];

var currentTestCountry=0;

function getCurrentCountry(){
	return testAssocArray[currentTestCountry];
}

function timeout(ms) {
	var d = webdriver.promise.defer();
	var start = Date.now();
	setTimeout(function() {
		d.fulfill(Date.now() - start);
	}, ms);
	return d.promise;
}

function beginAppTesting() {
	console.log("begin App Testing,...")
	timeout(10000).then(checkPage);
}

function checkPage(ms) {
	console.log("checking page after "+ms+" milliseconds.");
	driver.findElement(webdriver.By.name('countryName'))
	.then(enterCountryName)
	.then(selectCountryName)
	.then(sayFinished);
}

function enterCountryName(inputElem) {
	console.log("country name entered "+getCurrentCountry().countryName);
	return inputElem.sendKeys(getCurrentCountry().countryName);
}

function selectCountryName(z) {
	console.log("country name selected "+getCurrentCountry().countryName);
	driver.findElement(webdriver.By.id(getCurrentCountry().countryName)).click();
}

function selectCountryCurr(z) {
	console.log("country name selected "+getCurrentCountry().countryName);
	driver.findElement(webdriver.By.id(getCurrentCountry().countryName)).click();
}

function sayFinished(){
	console.log("sayFinished")
}

driver.get('http://www.planetkevin.com/angular/').
   then(beginAppTesting);

