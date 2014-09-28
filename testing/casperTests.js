var _local='http://localhost/imported/pk/public_html/angular/index.php';
var _remote='http://www.planetkevin.com/angular/index.php';

casper.test.begin('Page content tests', 8, function suite(test) {
    casper.start(_remote, function() {
		test.assertExists(".fullSize");
		test.assertExists(".loader");
		test.assertExists(".yinYang");
		test.assertExists("#animStepIntro");
//        test.assertExists("#introDivHolder");
        test.assertExists("#pageBottom");
        test.assertVisible("#introDivHolder");
        test.assertVisible("#container");
    }).waitForSelector('svg', function() {
    	console.log("this.getElementAttribute('svg', 'width')");
	}, function() {
	    test.assertExists("#svgMap");
		    console.log('and then');
	}, function() {
		    console.log('timedout');
	},10000
	).run(function() {
        test.done();
    });
});

/*

casper.test.begin('Page content tests', 3, function suite(test) {
    casper.start(_remote, function() {
        test.assertExists("#introDivHolder");
        test.assertExists("#pageBottom");
        test.assertVisible("body");
    }).waitForSelector('svg', function() {
    	console.log("this.getElementAttribute('svg', 'width')");
	    test.assertExists("#svgMap");
	}, function() {
		    console.log('and then');
	}, function() {
		    console.log('timedout');
	},10000
	).run(function() {
        test.done();
    });
});


*/

