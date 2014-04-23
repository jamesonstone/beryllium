/**
 * tools: casperjs/phantomjs
 *
 * This test navigates to all the activities 
 * and tests that they display correctly
 *
 * Run command:
 * casperjs --ignore-ssl-errors=true test test_payment_pages.js
 *
 * @author J.Stone
 */
var login = 'https://master.pub.voxy.com/u/login/';
var logout = 'https://master.pub.voxy.com/u/logout/';
var quiz = "https://master.pub.voxy.com/activities/lesson/by-resource/5314eeb772dd6848880c7459/quiz/";

//casperjs setup
var x = require('casper').selectXPath;
var casper = require('casper').create({
 	 //verbose: true, 
 	 //logLevel: 'debug'
});

//initialize the casper object and login to the website
casper.test.begin('setup', 1, function(test) {
	casper.start(login, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		this.wait(1000, function() {
			//check for the substring "guide/recommend/" in the url
			this.test.assert((this.getCurrentUrl().indexOf("guide/recommend/") != -1), "guide is displayed");
		});
	});

	casper.run(function() {
		test.done();
	});
});

//test quiz activity
casper.test.begin("Test text article quiz activity", 6, function(test) {
	casper.start(quiz, function() {
		//this.echo(this.getCurrentUrl());		
	});

	//check the pre-activity page
	casper.then(function() {
		test.assertUrlMatch(quiz, 'quiz url is displayed');
		test.assertSelectorHasText(x('//*[@id="content"]/div[3]/div/div[1]/div[1]/div[1]/div/div[2]/div/h5'), "\"The Starry Night\" by Van Gogh");
		test.assertExists(x('//*[@id="resource-jplayer-container-0"]'), 'player displays');		
		test.assertExists(x('//*[@id="content"]/div[3]/div/div[1]/div[1]/div[1]/div/div[1]/img'), 'article image displays');
		test.assertExists(x('//*[@id="content"]/div[3]/div/div[2]/div/div[1]/div/div[1]/div/button'), 'ok button displays');
		//click the ok, I'm ready button
		this.click(x('//*[@id="content"]/div[3]/div/div[2]/div/div[1]/div/div[1]/div/button'));
	});

	//check the functionality of the activity
	casper.waitForSelector(x('//*[@id="content"]/div[3]/div/div[2]/div/div[1]/div/div[2]/button'), function() {
		test.assertExists(x('//*[@id="content"]/div[3]/div/div[2]/div/div[1]/div/div[1]/div/div[1]/div[2]/div[1]'), );
		this.click(x('//*[@id="content"]/div[3]/div/div[2]/div/div[1]/div/div[2]/button'));
	});

	casper.run(function() {
		test.done();
	});
});


//neccessary to clear the casper instance being passed around
casper.test.begin("teardown", 1, function(test) {
    casper.start(logout, function() {
    	test.assertUrlMatch(logout, 'logout url is displayed');
    });		

	casper.run(function() {
		test.done();
		this.exit();
	});
});


