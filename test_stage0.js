/**
 * tools: casperjs/phantomjs
 *
 * Tests various elements on each of the major sections
 *
 * casperjs --ignore-ssl-errors=true test test_stage0.js --foo=
 *
 * @author J.Stone
 */

// var login_page = 'http://master.pub.voxy.com/u/login/';
// var logout = 'http://master.pub.voxy.com/u/logout/';

var foo = casper.cli.get("foo"); 

//foo == '' ? foo = 'master' : foo = casper.cli.get("foo");

var x = require('casper').selectXPath;
var casper = require('casper').create({
	 // verbose: true, 
	 // logLevel: 'debug'
});


var login_page = 'http://' + foo + '.pub.voxy.com/u/login/';
var logout = 'http://' + foo + '.pub.voxy.com/u/logout/';

casper.test.begin("Check the Guide displays", 0, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		this.wait(1000);
		this.echo('url: ' + this.getCurrentUrl());
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.wait(500);
		this.echo('url: ' + this.getCurrentUrl());		
	});

	casper.run(function() {
		test.done();
		this.exit();
	});	
});