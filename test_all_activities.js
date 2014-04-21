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
//var x = require('casper').selectXPath;
var casper = require('casper').create({
 	 //verbose: true, 
 	 //logLevel: 'debug'
});


casper.test.begin('Initialize the tests by logging into the Guide', 1, function(test) {
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
			this.echo(this.getCurrentUrl());
	});

	casper.run(function() {
		test.done();
	});
});

// casper.test.begin("Test text article \"quiz\" activity", 0, function(test) {
// 	casper.thenOpen(quiz, function() {
// 		this.wait(1000);
// 		this.echo(this.getCurrentUrl());
// 	});

// 	casper.run(function() {
// 		test.done();
// 	});
// });


//neccessary to clear the casper instance being passed around
casper.test.begin("Clear session for next tests", 0, function(test) {
    casper.start(logout);

    casper.then(function() {
    	this.wait(1000);
    	this.echo(this.getCurrentUrl());
    });

	casper.run(function() {
		test.done();
		this.exit();
	});
});






//run all the tests
casper.run(function() {
	test.done();
	this.exit();
	});
});



