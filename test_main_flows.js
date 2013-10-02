/**
 * tools: casperjs/phantomjs
 *
 * Test the following for major elements:
 * >> Guide // Login
 * >> Registration // FUE Compare
 * >> Activity Workspace
 * >> Compare page
 * >> Tutoring Compare
 *
 * Note: 
 * Must be run with --ignore-ssl-errors=true 
 * i.e. 'casperjs --ignore-ssl-errors=true test test_main_flows.js --foo= *branch_name*'
 *
 * casperjs --ignore-ssl-errors=true test test_main_flows.js --foo=master
 *
 * @author J.Stone
 */

 var foo = casper.cli.get("foo"); 

// links 
var login_page = 'http://' + foo + '.pub.voxy.com/u/login/';
var homepage = 'http://' + foo + '.pub.voxy.com/';
var logout = 'http://' + foo + '.pub.voxy.com/u/logout/';
var compare = 'http://' + foo + '.pub.voxy.com/guide/compare/';
var tutor_compare = 'http://' + foo + '.pub.voxy.com/guide/tutor/credits/';


// casper instance
var casper = require('casper').create({
	 // verbose: true, 
	 // logLevel: 'debug'
});

casper.test.begin("Check the Guide displays", 7, function(test) {
	//move to setup
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
		test.assertExists('#lesson-preview > div:nth-of-type(2) > div > a', 'Start button displays');
		test.assertExists('#main-content > div > div:nth-of-type(1)', 'Snapshot widget displays');
		test.assertExists('#main-content > div > div:nth-of-type(3)', 'Interest VoxyBox displays');
		test.assertExists('html > body > div > div:nth-of-type(2)', 'Mobile VoxyBox displays');
		test.assertExists('html > body > div > div:nth-of-type(2)', 'Tutoring VoxyBox displays');
		test.assertExists('html > body > div', 'Subscribe VoxyBox displays');
	});

	casper.run(function() {
		test.done();
	});	
});


casper.test.begin("Check the Activity Workspace displays", 6, function(test) {
	casper.then(function() {
		//wait for guide to load
		this.wait(1000, function() {
			this.click('#lesson-preview > div:nth-of-type(2) > div > a');
		});
	});

	casper.then(function() {
		this.wait(1000, function() {
			this.echo('current url: ' + this.getCurrentUrl());
			test.assertExists('#footer > div > div > div:nth-of-type(1) > button', 'Exit button (in footer) displays');
			test.assertExists('#footer > div > div > div:nth-of-type(2) > ol > li:nth-of-type(1) > li > a > span',
			 'Summary (in footer) displays');
			test.assertExists('#footer > div > div > div:nth-of-type(2) > ol > li:nth-of-type(3) > li > a',
				'Words (in footer) displays');
			test.assertExists('#footer > div > div > div:nth-of-type(2) > ol > li:nth-of-type(3) > li > a',
				'Translate (in footer) displays');
			test.assertExists('#content > div:nth-of-type(3) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div > button', 
				'OK, I\'m ready! button displays');
			test.assertExists('#content > div:nth-of-type(3) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div',
				'Start Your Lesson text displays');
		});
	});

	casper.run(function() {
		test.done();
	});	
});

casper.test.begin("Check that /guide/compare/ displays", 8, function(test) {
	casper.thenOpen(compare, function() {
		//wait for guide to load
		this.wait(1000, function() {
			this.echo('current url: ' + this.getCurrentUrl());
		});
	});

	casper.then(function() {
		this.wait(1000, function() {
			test.assertExists('#main-content > div > div:nth-of-type(1) > div:nth-of-type(1)',
			 '/compare/ header displays');
			test.assertExists('#main-content > div > div:nth-of-type(3) > div', '/compare/ plans are displayed');
			test.assertExists('#s2id_autogen1 > a > span', 'Currency dropdown displays');
			test.assertExists('#main-content > div > div:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1)',
				'12 month plan exists');
			test.assertExists('#main-content > div > div:nth-of-type(3) > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)',
				'3 month plan exists');
			test.assertExists('#main-content > div > div:nth-of-type(4) > div:nth-of-type(1) > img', 'Guarantee icon displays');
			test.assertExists('#main-content > div > div:nth-of-type(3) > div > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > a', 
				'3 month subscribe button displays');
			test.assertExists('#main-content > div > div:nth-of-type(3) > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > a', 
				'12 month subscribe button displays');			
		});
	});

	casper.run(function() {
		test.done();
	});
});


casper.test.begin("Check that /guide/tutor/credits/ displays", 7, function(test) {
	casper.thenOpen(tutor_compare, function() {
		//wait for guide to load
		this.wait(1000, function() {
			this.echo('current url: ' + this.getCurrentUrl());
		});
	});

	casper.then(function() {
		this.wait(1000, function() {
			test.assertExists('#main-content > div > div:nth-of-type(1) > div:nth-of-type(1)',
			 'Tutor Compare header displays');
			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div',
			 '1 Credit card is displayed');
			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > a', 
			 '1 Credit Buy button is displayed');
			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div', 
			 '8 Credit card is displayed');
			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div > div:nth-of-type(3) > a', 
			 '8 Credit Buy button is displayed');
			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(3) > div > div:nth-of-type(2) > div', 
			 '20 Credit card is displayed');
			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(3) > div > div:nth-of-type(3) > a',
			 '20 Credit Buy button is displayed');
		});
	});

	casper.run(function() {
		test.done();
		this.exit();
	});	
});


// casper.test.begin("Verify ability to register new user", 7, function(test) {
// 	casper.Open(homepage, function() {
// 		//wait for homepage to load
// 		this.wait(1000, function() {
// 			this.echo('current url: ' + this.getCurrentUrl());
// 		});
// 	});

// 	casper.then(function() {
// 		this.click('#fixed-login > div > div > div > a');
// 		this.wait(1000);
// 		this.echo('current url: ' + this.getCurrentUrl());
// 	})

// 	casper.then(function() {
// 		this.wait(1000, function() {
// 			test.assertExists('#main-content > div > div:nth-of-type(1) > div:nth-of-type(1)',
// 			 'Tutor Compare header displays');
// 			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div',
// 			 '1 Credit card is displayed');
// 			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > a', 
// 			 '1 Credit Buy button is displayed');
// 			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div', 
// 			 '8 Credit card is displayed');
// 			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(2) > div > div:nth-of-type(3) > a', 
// 			 '8 Credit Buy button is displayed');
// 			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(3) > div > div:nth-of-type(2) > div', 
// 			 '20 Credit card is displayed');
// 			test.assertExists('#main-content > div > div:nth-of-type(2) > div > div:nth-of-type(3) > div > div:nth-of-type(3) > a',
// 			 '20 Credit Buy button is displayed');
// 		});
// 	});

// 	casper.run(function() {
// 		test.done();
// 		this.exit();
// 	});	
// });





