/**
 * tools: casperjs/phantomjs
 * 
 * This test checks that the VPA is loaded and displayed. 
 *
 *
 * @author J.Stone
 */


var foo = 'master';


// links 
var login_page = 'https://' + foo + '.pub.voxy.com/u/login/';
var logout = 'https://' + foo + '.pub.voxy.com/u/logout/';
var vpa = 'https://master.pub.voxy.com/activities/lesson/vpa/';



// casper instance
var casper = require('casper').create({
	//  verbose: true, 
	//  logLevel: 'debug'
});

casper.test.begin("Check that the vpa displays", 7, function(test) {
	//move to setup
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'new_2@voxy.com',
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

	casper.thenOpen(vpa, function() {
		test.assertExists('#content > div:nth-of-type(8) > div:nth-of-type(3) > div:nth-of-type(1) > div > span:nth-of-type(1)', 
			'Voxy Proficiency title displays in pop up');
		this.click('#content > div:nth-of-type(8) > div:nth-of-type(3) > div:nth-of-type(2) > div > div:nth-of-type(2) > div:nth-of-type(2) > button');
		this.wait(1000);
	});

	casper.then(function() {
		test.assertExists('#content > div:nth-of-type(3) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(2)', 
			'Activity instructions are displayed');
		test.assertExists('#content > div:nth-of-type(3) > div > div:nth-of-type(1) > div:nth-of-type(2) > ol > li:nth-of-type(1) > p', 
			'Left side content displays');
		test.assertExists('#content > div:nth-of-type(3) > div > div:nth-of-type(2) > div > div:nth-of-type(2)', 
			'Answer options are displayed');
	});

	casper.run(function() {
		test.done();
		this.exit();
	});	
});