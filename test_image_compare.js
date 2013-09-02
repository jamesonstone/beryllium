

var login_page = 'http://www.voxy.com/u/login/';
var logout = 'http://www.voxy.com/u/logout/';

var fs = require('fs');
var casper = require('casper').create({
	viewportSize: {
		width: 1024, 
		height: 768
	}	
});

casper.test.begin("Check Compare page", 1, function(test) {
var compare_page = 'https://voxy.com/guide/compare/';

	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'imagetester1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.thenOpen(compare_page, function() {
		this.wait(5000);
		this.echo('current url: ' + this.getCurrentUrl());		
	});

	casper.then(function() {
		var ref_image = fs.read('./compare_page.png');
		
		this.capture('realtime_compare_page.png');
		//this.capture('compage_page.png');
		//this.echo('image captured');
		
		var new_image = fs.read('./realtime_compare_page.png');
		this.test.assert(new_image == ref_image);
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