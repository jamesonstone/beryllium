/**
 * tools: casperjs/phantomjs
 *
 * Tests various elements on each of the major sections
 *
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

casper.test.begin("Check the Guide displays", 6, function(test) {
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
		test.assertExists('h3.hdr', 'Snapshot text is displayed');
		test.assertExists(x('/html/body/div[1]/div/div/div/div/div/div[1]'), 'Preference questions are displayed');
		test.assertExists(x('/html/body/div/div[2]'), 'Smartphone or tablet voxybox displays');
		test.assertExists(x('/html/body/div/div[2]'), 'Tutor voxybox displays');
		test.assertExists(x('/html/body/div'), 'Subscribe voxybox displays')
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
	});	
});


casper.test.begin('Check the Popular section displays', 3, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		//wait for guide to load
		this.wait(1000, function() {
			this.click('i.icon-explore');
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			if(check_url.indexOf("guide/explore/") === -1) {
				casper.test.fail('url does not contain guide/explore/popular/');
			} else {
				casper.test.pass('Popular section is displayed');
			}
		});
	});

	casper.then(function() {
		test.assertExists(x('//*[@id="main-content"]/div/div[1]/div/h2/span[3]'), 'Popular title displays');
		test.assertExists(x('//*[@id="main-content"]/div/div[2]/div/div[1]'), 'First story widget is displayed');
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
	});	
});

casper.test.begin('Check that Explore > Read displays', 3, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		//wait for guide to load
		this.wait(1000, function() {
			this.click(x('//*[@id="side-nav"]/div/li[3]/div/a[2]'));
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			if(check_url.indexOf("guide/explore/read/") === -1) {
				casper.test.fail('url does not contain guide/explore/popular/read/');
			} else {
				casper.test.pass('Explore > Read section is displayed');
			}
		});
	});

	casper.then(function() {
		test.assertExists(x('//*[@id="main-content"]/div/div[1]/div/h2/span[2]'), 'Read title displays');
		test.assertExists(x('//*[@id="main-content"]/div/div[2]/div/div[1]'), 'First story widget is displayed');
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
	});	
});

casper.test.begin('Check that Explore > Listen displays', 3, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		//wait for guide to load
		this.wait(1000, function() {
			this.click(x('//*[@id="side-nav"]/div/li[3]/div/a[3]'));
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			if(check_url.indexOf("guide/explore/listen/") === -1) {
				casper.test.fail('url does not contain guide/explore/popular/listen/');
			} else {
				casper.test.pass('Explore > Listen section is displayed');
			}
		});
	});

	casper.then(function() {
		test.assertExists(x('//*[@id="main-content"]/div/div[1]/div/h2/span[1]'), 'Listen title displays');
		//Currently there are no music resources published
		test.assertExists(x('//*[@id="main-content"]/div/div[2]/div/div/div/div[2]/div'), 'Nothing is displayed');
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
	});	
});


casper.test.begin('Check that Explore > Converse displays', 3, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		//wait for guide to load
		this.wait(1000, function() {
			this.click(x('//*[@id="side-nav"]/div/li[3]/div/a[4]'));
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			if(check_url.indexOf("guide/explore/converse/") === -1) {
				casper.test.fail('url does not contain guide/explore/popular/converse/');
			} else {
				casper.test.pass('Explore > Converse section is displayed');
			}
		});
	});

	casper.then(function() {
		test.assertExists(x('//*[@id="main-content"]/div/div[1]/div/h2/span[3]'), 'Converse title displays');
		test.assertExists(x('//*[@id="main-content"]/div/div[2]/div/div[1]'), 'First story widget is displayed');
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
	});	
});

casper.test.begin('Check that Explore > View Images displays', 3, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		//wait for guide to load
		this.wait(1000, function() {
			this.click(x('//*[@id="side-nav"]/div/li[3]/div/a[5]'));
			var check_url = this.getCurrentUrl();
			this.echo('current url: ' + check_url);

			if(check_url.indexOf("guide/explore/view/") === -1) {
				casper.test.fail('url does not contain guide/explore/popular/view/');
			} else {
				casper.test.pass('Explore > View Images section is displayed');
			}
		});
	});

	casper.then(function() {
		test.assertExists(x('//*[@id="main-content"]/div/div[1]/div/h2/span[5]'), 'View Images title displays');
		test.assertExists(x('//*[@id="main-content"]/div/div[2]/div/div[1]'), 'First story widget is displayed');
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




