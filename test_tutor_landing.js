/**
 * tools: casperjs/phantomjs
 *
 * Tests the tutoring landing page
 *
 * Note: 
 * Must be run with --ignore-ssl-errors=true 
 * i.e. 'casperjs --ignore-ssl-errors=true test test_tutor_landing.js --foo= *branch_name*'
 *
 * casperjs --ignore-ssl-errors=true test test_tutor_landing.js --foo=master
 *
 * @author J.Stone
 */

 var foo = casper.cli.get("foo"); 

// links 
var landing_page = 'http://' + foo + '.pub.voxy.com/landing/web/zp1/tutor/';



// casper instance
var casper = require('casper').create({
	 // verbose: true, 
	 // logLevel: 'debug'
});

casper.test.begin("Check Tutor Focused landing page displays", 11, function(test) {
	//move to setup
	casper.start(landing_page, function() {
		this.wait(1000);
	});

	casper.then(function() {
		//wait for guide to load
		this.wait(1000, function() {
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			//check for the substring "zp1/tutor/" in the url
			if(check_url.indexOf("zp1/tutor/") === -1) {
				casper.test.fail('url does not contain zp1/tutor/ -- tutor targeted landing page');
			} else {
				casper.test.pass('Tutor Target Landing page is displayed');
			}
		});
	});

	casper.then(function() {
		test.assertExists('#layout > div:nth-of-type(1)', 'Voxy logo is displayed');
		test.assertExists('#layout > div:nth-of-type(2) > a', 'Start my free 7-day button displays');
		test.assertExists('#layout > ul > li:nth-of-type(1) > div:nth-of-type(1)', 'Improve Your Speaking icon displays');
		test.assertExists('#layout > ul > li:nth-of-type(2) > div:nth-of-type(1)', 'Reinforce What You Learn icon displays');
		test.assertExists('#layout > ul > li:nth-of-type(3) > div:nth-of-type(1)', 'Stay Motivated icon displays');
		test.assertExists('html > body > div:nth-of-type(2)', 'Tutoring image displays');
		test.assertExists('html > body > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > img', 
			'Guaranteed logo displays');
		test.assertExists('html > body > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > img', 
			'Pearson logo displays');
		test.assertExists('html > body > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div', 
			'Google logo displays');
		test.assertExists('html > body > div:nth-of-type(3) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3) > img', 
			'As seen in logo displays');
	});

	casper.run(function() {
		test.done();
		this.exit();
	});	
});