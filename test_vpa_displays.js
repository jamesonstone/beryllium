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
		this.echo('current url: ' + this.getCurrentUrl());

	});

	casper.run(function() {
		test.done();
		this.exit();
	});	
});