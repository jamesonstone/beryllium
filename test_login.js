/**
 * tools: casperjs/phantomjs
 *
 * This test navigates to voxy.com/u/login/ 
 * and tests the login function
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


casper.test.begin("Test a valid login at /u/login/", 1, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		//added wait here because transition to guide wasn't occuring fast enough
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

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		//TODO: add this to teardown
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
	});

});

casper.test.begin("Test a invalid login at /u/login/", 2, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		var check_url = this.getCurrentUrl();
		this.echo('current url: ' + check_url);

		//check for the substring "guide/recommend/" in the url
		if(check_url.indexOf("guide/recommend/") === -1) {
			casper.test.pass('url does not contain guide/recommend/');
		} else {
			casper.test.fail('Guide is displayed');
		}
	});

	casper.then(function() {
		//verify error text is displayed (language agnostic)
		test.assertExists("ul.errorlist", 'Error text displays!	');
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		//TODO: add this to teardown		
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);		
	});

	casper.run(function() {
		test.done();
	});

});


casper.test.begin("Test a valid login at voxy.com (header)", 1, function(test) {
	casper.start(homepage, function() {
		this.click(x('//*[@id="header_login_Btn"]'));
	});

	casper.then(function() {
		//fill out and submit login form
		this.fill('form#header_login', {
			'username':    'u1@voxy.com',
			'password':    'things'
		}, true);
	});

	casper.wait(1500, function() {
		var check_url = this.getCurrentUrl();
		this.echo('current url: ' + check_url);

		//check for the substring "guide/recommend/" in the url
		if(check_url.indexOf("guide/recommend/") === -1) {
			casper.test.fail('url does not contain guide/recommend/');
		} else {
			casper.test.pass('Guide is displayed');
		}
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		//TODO: add this to teardown		
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);		
	});	

	casper.run(function() {
		test.done();
	});

});

casper.test.begin("Test a invalid login at voxy.com (header)", 1, function(test) {
	casper.start(homepage, function() {
		this.click(x('//*[@id="header_login_Btn"]'));
	});

	casper.then(function() {
		//fill out and submit login form
		this.fill('form#header_login', {
			'username':    'u1',
			'password':    'things'
		}, true);
	});

	casper.wait(1000, function() {
		var check_url = this.getCurrentUrl();
		this.echo('current url: ' + check_url);

		//check for the substring "/u/login/" in the url (after redirect)
		if(check_url.indexOf("u/login/") === -1) {
			casper.test.fail('url does not contain u/login/');
		} else {
			casper.test.pass('User was redirected to u/login/ successfully');
		}
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		//TODO: add this to teardown		
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);		
	});	

	casper.run(function() {
		test.done();
		//exit the tests
		this.exit();
	});

});
