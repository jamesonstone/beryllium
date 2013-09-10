/**
 * tools: casperjs/phantomjs
 *
 * This test test variations of the onboarding flow
 *
 * @author J.Stone
 */

var login_page = 'http://voxy.com/u/login/';
var homepage = 'http://voxy.com/';
var keyonboarding = 'http://keyonboarding.pub.voxy.com';
var logout = 'http://voxy.com/u/logout/';
var branch;

// function startup(branch_name) {
// 	return 
// }

var x = require('casper').selectXPath;	
var casper = require('casper').create({
	 // verbose: true, 
	 // logLevel: 'debug'
});
 casper.echo(branch + 'xxx');

casper.test.begin("Check Free Tutoring Credit messaging displays for in trial user", 2, function(test) {
	// casper.start(login_page, function() {
	// 	this.fill('form#ajax-login-form', {
	// 	'username':    'tutortest10@voxy.com',
	// 	'password':    'things'
	// 	}, true);
	// });

	casper.start(keyonboarding, function() {
		this.wait(500);
		this.test.assertExists('#fixed-login > div > div > div > a', 'Get Started button Displays');
		this.click('#fixed-login > div > div > div > a');
	});

	casper.wait(1000, function() {
		this.echo('current url: ' + this.getCurrentUrl());

	});

	// casper.wait(1000, function() {
	// 	//wait for FUE to load
	// 	this.echo('current url: ' + this.getCurrentUrl());
	// 	this.click('i.icon-tutor');
	// });

	// casper.then(function() {
	// 	this.echo('current url: ' + this.getCurrentUrl());
	// 	this.test.assertExists('#main-content > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > a', 
	// 		'Free Tutoring Credit messaging displays');
	// 	this.test.assertSelectorHasText('#main-content > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > a',
	// 		'You have 1 credit.');
	// });

	// casper.thenOpen(logout, function() {
	// 	//dump the current session and logout
	// 	this.echo('current url: ' + this.getCurrentUrl());
	// 	this.wait(500);
	// });

	casper.run(function() {
		test.done();
		this.exit();
	});	
});
