/**
 * tools: casperjs/phantomjs
 *
 * Tests the hardsell landing page
 *
 * Note: 
 * Must be run with --ignore-ssl-errors=true 
 * i.e. 'casperjs --ignore-ssl-errors=true test test_hardsell_landing.js --foo= *branch_name*'
 *
 * casperjs --ignore-ssl-errors=true test test_hardsell_landing.js --foo=keylanding
 *
 * @author J.Stone
 */

 var foo = casper.cli.get("foo"); 

// links 
var landing_page = 'http://' + foo + '.pub.voxy.com/landing/web/en/nb1/1/';



// casper instance
var casper = require('casper').create({
	 // verbose: true, 
	 // logLevel: 'debug'
});

casper.test.begin("Check hardsell landing page displays", 15, function(test) {
	//move to setup
	casper.start(landing_page, function() {
		this.wait(1000);
		this.echo('url: ' + this.getCurrentUrl());
	});

	casper.then(function() {
		//wait for guide to load
		this.wait(1000, function() {
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			//check for the substring "guide/recommend/" in the url
			if(check_url.indexOf("nb1/1/") === -1) {
				casper.test.fail('url does not contain nb1/1/');
			} else {
				casper.test.pass('Landing page is displayed');
			}
		});
	});

	casper.then(function() {
		//this.wait(1000);
		test.assertExists('#modal_login > a', 'Sign Up With Email button displays');
		test.assertExists('#signinButton > span', 'Sign in with Google button displays');
		test.assertExists('#modal_login > div:nth-of-type(2) > ul > li:nth-of-type(2) > a > span', 
			'Sign Up with Facebook button displays');
		test.assertExists('#main > div:nth-of-type(2) > div:nth-of-type(3) > div > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1)', 
			'Video player displays');
		test.assertExists('#main > div:nth-of-type(2) > div:nth-of-type(4) > div > div:nth-of-type(2) > div:nth-of-type(1)', 
			'Proven Methodology header appears');
		test.assertExists('#main > div:nth-of-type(2) > div:nth-of-type(5) > div > div:nth-of-type(1) > div:nth-of-type(2) > img', 
			'Tutoring photo appears'); 
		test.assertExists('#main > div:nth-of-type(2) > div:nth-of-type(6) > div > div > div:nth-of-type(1) > div:nth-of-type(2) > img', 
			'Forbes icon displays');
		//Google play and App Store buttons are currently NOT selectable
		test.assertExists('#main > div:nth-of-type(2) > div:nth-of-type(7) > div > div:nth-of-type(2) > img', 
			'Google Play store icon displays');
		test.assertExists('#main > div:nth-of-type(2) > div:nth-of-type(7) > div > div:nth-of-type(2) > img', 
			'Appstore icon displays');
		//
		test.assertExists('#main > div:nth-of-type(2) > div:nth-of-type(8) > div > div:nth-of-type(2) > img', 
			'Progress screen-shot displays');
		test.assertExists('#main > div:nth-of-type(2) > div:nth-of-type(9) > div > div:nth-of-type(1) > div:nth-of-type(2) > img', 
			'Voxy guarntee logo displays');
		test.assertExists('#modal_login > a', 'Sign Up With Email button displays on the bottom of the page');
		test.assertExists('#signinButton', 'Sign Up With Google button displays on the bottom of the page');
		test.assertExists('#modal_login > div:nth-of-type(2) > ul > li:nth-of-type(2) > a', 
			'Sign in with Facebook button displays at the bottom of the page');
	});

	casper.run(function() {
		test.done();
		this.exit();
	});	
});

// casper.test.begin("Veirfy ability to register user via email", 15, function(test) {
// 	// unique random username
// 	var username = 'newrandom' + Math.floor((Math.random() * 1000000) + 1) + '@gmail.com';	

// 	//move to setup
// 	casper.start(landing_page, function() {
// 		this.wait(1000);
// 		this.echo('url: ' + this.getCurrentUrl());
// 		this.echo('username: ' + username);
// 	});

// 	casper.then(function() {
// 		//if this click is enabled, button won't display the next go-around 
// 		this.click('#modal_login > a');
// 		this.wait(3000);
// 	});

// 	 casper.then(function() {
// 	 	this.fill('#modal_login', {
// 		'first_name':  'username',
// 	 	'email':    username,
// 	 	'password':    'things'
// 	 	}, true);		
// 	 });

// 	 casper.then(function() {
// 	 	this.wait(5000);
// 	 	this.echo('url: ' + this.getCurrentUrl());
// 	 });

// 	casper.run(function() {
// 		test.done();
// 		this.exit();
// 	});	
// });