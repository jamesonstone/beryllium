/**
 * tools: casperjs/phantomjs
 *
 * Tests the advanced focused landing page
 *
 * Note: 
 * Must be run with --ignore-ssl-errors=true 
 * i.e. 'casperjs --ignore-ssl-errors=true test test_advanced_landing.js --foo= *branch_name*'
 *
 * casperjs --ignore-ssl-errors=true test test_advanced_landing.js --foo=master
 *
 * @author J.Stone
 */

 var foo = casper.cli.get("foo"); 

// links 
var landing_page = 'http://' + foo + '.pub.voxy.com/landing/web/zp3/advanced/';



// casper instance
var casper = require('casper').create({
	 // verbose: true, 
	 // logLevel: 'debug'
});

casper.test.begin("Check advanced landing page displays", 9, function(test) {
	//move to setup
	casper.start(landing_page, function() {
		this.wait(1000);
	});

	casper.then(function() {
		this.wait(1000, function() {
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			//check for the substring "zp3/advanced/" in the url
			if(check_url.indexOf("zp3/advanced/") === -1) {
				casper.test.fail('url does not contain zp3/advanced/ -- advanced targeted landing page');
			} else {
				casper.test.pass('Advanced Targeted Landing page is displayed');
			}
		});
	});

	casper.then(function() {
		test.assertExists('#layout > div:nth-of-type(1)', 'Voxy logo is displayed in the top right corner');
		test.assertExists('#layout > a', 'Start Your 7 Day Trial button displays');
		test.assertExists('html > body > div:nth-of-type(2) > ul > li:nth-of-type(1) > div:nth-of-type(1)',
		 	'Pronunciation & Fluency icon is displayed');
		test.assertExists('html > body > div:nth-of-type(2) > ul > li:nth-of-type(2) > div:nth-of-type(1)',
		 	'Real World Scenarios icon is displayed');
		test.assertExists('html > body > div:nth-of-type(2) > ul > li:nth-of-type(3) > div:nth-of-type(1)',
			'Expressions & Colloquialsims icon is displayed');
		test.assertExists('html > body > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > img', 
			'Pearson logo is displayed');
		test.assertExists('html > body > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > img', 
			'As Seen In logos are displayed');
	});

	casper.then(function() {
		this.click('#layout > a');
		this.wait(1000);
	});

	casper.then(function() {
		this.wait(3000, function() {
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			//check for the substring "/personalize/step/0/" in the url
			if(check_url.indexOf("personalize/step/0/") === -1) {
				casper.test.fail('user is not redirected to personalize');
			} else {
				casper.test.pass('user is directed to personalize');
			}
		});
	});

	casper.run(function() {
		test.done();
		this.exit();
	});	
});