/**
 * tools: casperjs/phantomjs
 *
 * This test navigates to all the activities 
 * and tests that they display correctly
 *
 * Run command:
 * casperjs --ignore-ssl-errors=true test test_payment_pages.js
 *
 * @author J.Stone
 */
var logout = 'https://master.pub.voxy.com/u/logout/';

//casperjs setup
//var x = require('casper').selectXPath;
var casper = require('casper').create({
 	 // verbose: true, 
 	 // logLevel: 'debug'
});

//neccessary to clear the casper instance being passed around
casper.test.begin("Clear session for next tests", 0, function(test) {
    casper.start(logout, function() {
		this.echo(this.getCurrentUrl());
	});

	casper.run(function() {
		test.done();
		this.exit();
	});
});

/**
*	This checks for 200 responses on critical pages
*
	casper.then(function(response) {
		//navigate to the right payment url
		for (var i = 0; i < payment_pages.length; i++) {
			this.thenOpen(payment_pages[i], function() {
				this.echo(this.getCurrentUrl());							
				this.test.assertHttpStatus(200);
				if(response == undefined || response.status >= 400) {
					this.test.fail("Page Failed to Load: " + this.echo(this.getCurrentUrl()));
				};				
				//this.test.assertTextDoesntExist('Error: 500', 'Page ok');				
				//debug dump:
				//utils.dump(response.status);
				//look to adding response-level catching here
				//http://stackoverflow.com/questions/17914489/how-to-get-casper-js-http-status-code
			});
		}
	});

**/

