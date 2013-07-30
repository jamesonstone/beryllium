/**
 * tools: casperjs/phantomjs
 *
 * Tests various elements on each of the major sections
 *
 *
 * @author J.Stone
 */
var login_page = 'http://voxy.com/u/login/';
var homepage = 'http://voxy.com/';
var logout = 'http://voxy.com/u/logout/';

var x = require('casper').selectXPath;
var casper = require('casper').create({
	 //verbose: true, 
	 //logLevel: 'debug'
});

//setup
casper.test.setup(function() {

});

//teardown
casper.test.tearDown(function() {
	casper.start(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);		
	});	
});


casper.test.begin("Check the Guide displays", 1, function(test) {






	casper.run(function() {
		test.done();
	});

});