/**
 * tools: casperjs/phantomjs
 *
 * Tests various elements on each of the major sections
 *
 *
 * @author J.Stone
 */
var login_page = 'http://master.pub.voxy.com/u/login/';
var homepage = 'http://master.pub.voxy.com/';
var logout = 'http://master.pub.voxy.com/u/logout/';

var x = require('casper').selectXPath;
var casper = require('casper').create({
	 // verbose: true, 
	 // logLevel: 'debug'
});

casper.test.begin("Check the Guide displays", 6, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		//wait for guide to load
		this.wait(1000, function() {
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			//check for the substring "guide/recommend/" in the url
			if(check_url.indexOf("guide/recommend/") === -1) {
				casper.test.fail('url does not contain guide/recommend/');
			} else {
				casper.test.pass('Guide is displayed');
			}
		});
	});

	casper.then(function() {
		test.assertExists('#lesson-preview > div:nth-of-type(2) > div > a > a', 'Start button displays');
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
		this.exit();
	});	
});