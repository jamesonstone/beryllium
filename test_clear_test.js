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


