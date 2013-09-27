/**
 * tools: casperjs/phantomjs
 *
 * Tests various elements on each of the major sections
 *
 * casperjs --ignore-ssl-errors=true test test_stage0.js --foo=
 *
 * @author J.Stone
 */
//casperjs --ignore-ssl-errors=true test test_main_flows.js --foo=master
// var login_page = 'http://master.pub.voxy.com/u/login/';
// var logout = 'http://master.pub.voxy.com/u/logout/';

var foo = casper.cli.get("foo"); 

//foo == '' ? foo = 'master' : foo = casper.cli.get("foo");

var x = require('casper').selectXPath;
var casper = require('casper').create({
	 // verbose: true, 
	 // logLevel: 'debug'
});


var login_page = 'http://' + foo + '.pub.voxy.com/u/login/';
var homepage = 'http://' + foo + '.pub.voxy.com/';
var logout = 'http://' + foo + '.pub.voxy.com/u/logout/';
var compare = 'http://' + foo + '.pub.voxy.com/guide/compare/';
var tutor_compare = 'http://' + foo + '.pub.voxy.com/guide/tutor/credits/';

casper.test.begin("Verify ability to register new user", 7, function(test) {
	casper.start(homepage, function() {
		this.wait(1000);
		this.click('#fixed-login > div > div > div > a');
	});

	casper.then(function() {
		this.wait(1000);
		this.echo('current url: ' + this.getCurrentUrl());
		test.assertExists('#main > div > div:nth-of-type(1) > div > div > div:nth-of-type(1)', 'Your Proficiency Level title displays');
		test.assertExists('#main > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div > div > div:nth-of-type(6) > div > div > img', 
			'Voxy logo displays in personalize pop up');
		this.click('#main > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div > div > div:nth-of-type(6) > div > div > div > a');
		test.assertExists('#level_1 > a', 'Level 1 icon displays');
		test.assertExists('#level_2 > a', 'Level 2 icons displays');
		test.assertExists('#level_3 > a', 'Level 3 icons displays');
		test.assertExists('#level_4 > a', 'Level 4 icons displays');
		test.assertExists('#level_5 > a', 'Level 5 icons displays');
		test.assertExists('#level_6 > a', 'Level 6 icons displays');
		test.assertExists('#level_7 > a', 'Level 7 icons displays');
	});

	casper.then(function() {
		this.click('#level_1 > a');
		this.wait(1000);
		this.click('#main > div > div:nth-of-type(3) > div > div > div > div > button');
	});

	casper.then(function() {
		this.wait(1000);
		this.echo('current url: ' + this.getCurrentUrl());
		test.assertExists('#main > div > div:nth-of-type(1) > div > div > div:nth-of-type(1)', 'Your Goals title displays');
		test.assertExists('#goal-form > ul > li:nth-of-type(1) > div:nth-of-type(2)', 'Advance my Career displays');
		test.assertExists('#goal-form > ul > li:nth-of-type(2) > div:nth-of-type(2)', 'Enjoy English Media displays');
		test.assertExists('#goal-form > ul > li:nth-of-type(3) > div:nth-of-type(2)', 'Pass My English Test displays');
		test.assertExists('#goal-form > ul > li:nth-of-type(4) > div:nth-of-type(2)', 'Travel Abroad displays');
		test.assertExists('#goal-form > ul > li:nth-of-type(5) > div:nth-of-type(2)', 'Day to Day Tasks displays');
		test.assertExists('#goal-form > ul > li:nth-of-type(6) > div:nth-of-type(2)', 'Social & Lifestyle');
	});

	casper.then(function() {
		this.click('#goal-form > ul > li:nth-of-type(1) > div:nth-of-type(2)');
		this.wait(1000);
		this.click('#main > div > div:nth-of-type(3) > div > div > div > div > button');
	});

	casper.then(function() {
		this.wait(1000);
		this.echo('current url: ' + this.getCurrentUrl());

		//add verifications for 3rd step of FUE

	});








	casper.thenOpen(logout, function() {
		//dump the current session and logout
		this.echo('current url: ' + this.getCurrentUrl());

	});

	casper.run(function() {
		test.done();
		this.exit();
	});	
});