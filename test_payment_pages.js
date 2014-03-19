/**
 * tools: casperjs/phantomjs
 *
 * This test navigates to various payment pages
 * and tests that they display correctly
 *
 * @author J.Stone
 */
var login_page = 'http://master.pub.voxy.com/u/login/';
var logout = 'http://master.pub.voxy.com/u/logout/';
var payment_pages = [
	"https://master.pub.voxy.com/payment/voxytrial_7_12_120USD_24/?templateId=personalize-3box",
	"https://master.pub.voxy.com/payment/voxytrial_7_12_0_12/?templateId=personalize-3box",
	"https://master.pub.voxy.com/payment/voxytrial_7_12_0_52/?templateId=personalize-3box",
	"https://master.pub.voxy.com/payment/VoxyPremium_12_0_12_notrial/?templateId=inapp-valentines",
	"https://master.pub.voxy.com/payment/VoxyPremium_12_168USD_24_notrial/?templateId=inapp-valentines-premium",
	"https://master.pub.voxy.com/payment/VoxyPremium_12_0_12_notrial/?templateId=inapp-valentines",
	"https://master.pub.voxy.com/payment/VoxyPremium_12_0_52_notrial/?templateId=inapp-valentines",
	"https://master.pub.voxy.com/payment/VoxyPremium_3_0_8_notrial/?templateId=inapp-3-month-courses",
	"https://master.pub.voxy.com/payment/VoxyPremium_3_30USD_16_notrial/?templateId=inapp-3-month-courses",
	"https://master.pub.voxy.com/payment/VoxyPremium_3_0_24_notrial/?templateId=inapp-3-month-courses",
	"https://master.pub.voxy.com/payment/voxytrial_7_12_150USD_24/?templateId=inapp-full",
	"https://master.pub.voxy.com/payment/voxytrial_7_12_150USD_52/?templateId=inapp-full",
	"https://master.pub.voxy.com/payment/VoxyPremium_12_0_24_notrial/?templateId=inapp-monthly",
	"https://master.pub.voxy.com/payment/voxytutor_20_37/",
	"https://master.pub.voxy.com/payment/voxytutor_1_0/",
	"https://master.pub.voxy.com/payment/voxytutor_8_25/"
];


//casperjs setup
var utils = require('utils');
var http = require('http');
var fs = require('fs');
var x = require('casper').selectXPath;
// var casper = require('casper').create({
// 	 //verbose: true, 
// 	 //ogLevel: 'debug'
// });


casper.test.begin("Check for 400 or greater response on ALL payment pages", (payment_pages.length), function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		//added wait here because transition to guide wasn't occuring fast enough
		this.wait(1000, function() {
			this.echo("Guide load success: " + this.getCurrentUrl());
		});
	});

	casper.then(function(response) {
		//navigate to the right payment url
		for (var i = 0; i < payment_pages.length; i++) {
			this.thenOpen(payment_pages[i], function() {
				this.echo(this.getCurrentUrl());							
				this.test.assertHttpStatus(200);
				if(response == undefined || response.status >= 400) {
					this.test.fail("Page Failed to Load: " + this.echo(this.getCurrentUrl()));
				};				
				//this.test.assertTextDoesntExist('Error: 500', 'Page ok');				
				//debug dump:
				//utils.dump(response.status);
				//look to adding response-level catching here
				//http://stackoverflow.com/questions/17914489/how-to-get-casper-js-http-status-code
			});
		}
		//image capture here
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		//TODO: add this to teardown
		this.echo("Logout and clear data successful: " + this.getCurrentUrl());
	});

	casper.run(function() {
		test.done();
		// this.exit();
	});

});