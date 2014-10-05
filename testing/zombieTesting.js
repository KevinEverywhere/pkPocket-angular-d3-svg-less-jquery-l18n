var Browser = require("zombie");
var assert = require("assert");

// Load the page from localhost
browser = Browser.create();
browser.visit("http://localhost/imported/pk/public_html/angular/",{
  userAgent:"Mozilla/5.0 (iPhone; U; ru; CPU iPhone OS 4_2_1 like Mac OS X; ru) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148a Safari/6533.18.5"
}, function (error) {
  // Fill email, password and submit form
  console.log("arrived at home page.");
  /*
iPhone 4
Mozilla/5.0 (iPhone; U; ru; CPU iPhone OS 4_2_1 like Mac OS X; ru) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148a Safari/6533.18.5



  browser.
    fill("email", "zombie@underworld.dead").
    fill("password", "eat-the-living").
    pressButton("Sign Me Up!", function() {

      // Form submitted, new page loaded.
      browser.assert.success();
      browser.assert.text("title", "Welcome To Brains Depot");

    });

  */
});