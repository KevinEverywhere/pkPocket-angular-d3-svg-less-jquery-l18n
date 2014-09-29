var _local='http://localhost/imported/pk/public_html/angular/index.php';
var _remote='http://www.planetkevin.com/angular/index.php';

casper.test.begin('Page content tests', 13, function suite(test) {
    casper.start(_remote, function() {
    	test.assertExists("#completeContainer");		// Outermost Div is completeContainer
		test.assertExists("#introDivHolder");			// The preloading divs are introDivHolder, yinYang and animStepIntro
		test.assertExists(".yinYang");
		test.assertExists("#animStepIntro");
		test.assertExists("#masterMapApp");				// The root of the angular app is masterMapApp
		test.assertExists("#masterMapApp .fullSize")	// the BodyController has the fullSize class
														// and is used for communicating with child divs.
		test.assertExists("#container");				// container is the div that is invisible until loaded.
        test.assertExists("#firstGroup");				// firstGroup holds the world and country maps.
        test.assertExists("#secondGroup");				// secondGroup holds the country-specific tabs.

        test.assertExists("#pageBottom");				// pageBottom is the last element on the page.
    }).waitForSelector('svg', function() {				// The SVG element is drawn by the d3_module
    	console.log("SVG exists!")
	}, function() {
 //       test.assertExists("#worldDiv");
//	    test.assertExists("svg");
// 		Need to find out why, if waitForSelector('svg') has happend, worldDiv and svg elements not asserting
	    test.assertExists("#svgMap");
		    console.log('and then');
	}, function() {
		    console.log('timedout');
	},10000
	).waitForSelector('#countryMap', function() {
    	// empty function
	}, function() {
        test.assertExists("#countryMapHolder");			// countryMapHolder
        test.assertVisible("#googleMap");
	}, function() {
		    console.log('timedout');
	},10000
	).run(function() {
        test.done();
    });
});