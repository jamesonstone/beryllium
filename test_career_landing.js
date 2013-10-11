/**
 * tools: casperjs/phantomjs
 *
 * Tests the career focused landing page
 *
 * Note: 
 * Must be run with --ignore-ssl-errors=true 
 * i.e. 'casperjs --ignore-ssl-errors=true test test_career_landing.js --foo= *branch_name*'
 *
 * casperjs --ignore-ssl-errors=true test test_career_landing.js --foo=master
 *
 * @author J.Stone
 */

 var foo = casper.cli.get("foo"); 

// links 
var landing_page = 'http://' + foo + '.pub.voxy.com/landing/web/zp3/career/';



// casper instance
var casper = require('casper').create({
	 // verbose: true, 
	 // logLevel: 'debug'
});

casper.test.begin("Check Career landing page displays", 11, function(test) {
	//move to setup
	casper.start(landing_page, function() {
		this.wait(1000);
	});

	casper.then(function() {
		this.wait(1000, function() {
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			//check for the substring "zp3/career/" in the url
			if(check_url.indexOf("zp3/career/") === -1) {
				casper.test.fail('url does not contain zp3/career/ -- tutor targeted landing page');
			} else {
				casper.test.pass('Career Targeted Landing page is displayed');
			}
		});
	});

	casper.then(function() {
		test.assertExists('#layout > div:nth-of-type(1)', 'Voxy logo appears in top left corner');
		test.assertExists('#layout > a', 'Start your 7-day free trial button displays');
		test.assertExists('#layout', 'Background image displays');
		test.assertExists('html > body > div:nth-of-type(2) > ul > li:nth-of-type(1) > div:nth-of-type(1)', 
			'Technology icon displays');
		test.assertExists('html > body > div:nth-of-type(2) > ul > li:nth-of-type(2) > div:nth-of-type(1)', 
			'Speaking icon displays');
		test.assertExists('html > body > div:nth-of-type(2) > ul > li:nth-of-type(3) > div:nth-of-type(1)', 
			'Content icon displays');
		test.assertExists('html > body > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > img', 
			'Pearson icon displays');
		test.assertExists('html > body > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > img', 
			'Google logo displays');
		test.assertExists('html > body > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > img',
		 'As Seen In logos display');
	});

	casper.then(function() {
		this.click('#layout > a');
	});

	casper.then(function() {
		this.wait(1000, function() {
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