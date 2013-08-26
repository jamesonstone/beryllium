/**
 * tools: casperjs/phantomjs
 *
 * This test test variations of the free tutoring credit
 *
 * @author J.Stone
 */

var login_page = 'http://voxy.com/u/login/';
var homepage = 'http://voxy.com/';
var logout = 'http://voxy.com/u/logout/';

var x = require('casper').selectXPath;
var casper = require('casper').create({
	 // verbose: true, 
	 // logLevel: 'debug'
});

/**
 * tutortest10@voxy.com // things: 
 * non-premium user in trial, 1 tutoring credit
 *
 * tutortest1@voxy.com // things: 
 * non-premium user outside trial, 0 tutoring credit
 *
 * tutortest3@voxy.com // things: 
 * premium user 3month, 6 tutoring credits
 *
 * tutortest5@voxy.com // things: 
 * premium user 12month, 21 tutoring credits
 *
 * tutortest5@voxy.com // things: 
 * non-premium user with pending/expired tutoring session, 21 tutoring credits
 */

casper.test.begin("Check Free Tutoring Credit messaging displays for in trial user", 2, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'tutortest10@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.wait(1000, function() {
		//wait for guide to load
		this.echo('current url: ' + this.getCurrentUrl());
		this.click('i.icon-tutor');
	});

	casper.then(function() {
		this.echo('current url: ' + this.getCurrentUrl());
		this.test.assertExists('#main-content > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > a', 
			'Free Tutoring Credit messaging displays');
		this.test.assertSelectorHasText('#main-content > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > a',
			'You have 1 credit.');
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
		//this.exit();
	});	
});


casper.test.begin("Check Subscribe messaging displays for user outside trial", 2, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'tutortest1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.wait(1000, function() {
		//wait for guide to load
		this.echo('current url: ' + this.getCurrentUrl());
		this.click('i.icon-tutor');
	});

	casper.then(function() {
		this.echo('current url: ' + this.getCurrentUrl());
		this.test.assertExists('#main-content > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > a', 
			'Subscribe messaging displays');
		this.test.assertSelectorHasText('#main-content > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > a',
			'Subscribe Now');
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
		//this.exit();
	});	
});


casper.test.begin("Check Premium (3mo) user gains extra credit when subscribing in trial", 2, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'tutortest3@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.wait(1000, function() {
		//wait for guide to load
		this.echo('current url: ' + this.getCurrentUrl());
		this.click('i.icon-tutor');
	});

	casper.then(function() {
		this.echo('current url: ' + this.getCurrentUrl());
		this.test.assertExists('#main-content > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > a', 
			'Free Tutoring Credit messaging displays');
		this.test.assertSelectorHasText('#main-content > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > a',
			'You have 6 credits. Get more');
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
		//this.exit();
	});	
});


casper.test.begin("Check Premium (12mo) user gains extra credit when subscribing in trial", 2, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'tutortest5@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.wait(1000, function() {
		//wait for guide to load
		this.echo('current url: ' + this.getCurrentUrl());
		this.click('i.icon-tutor');
	});

	casper.then(function() {
		this.echo('current url: ' + this.getCurrentUrl());
		this.test.assertExists('#main-content > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > a', 
			'Free Tutoring Credit messaging displays');
		this.test.assertSelectorHasText('#main-content > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > a',
			'You have 21 credits. Get more');
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