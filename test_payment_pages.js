/**
 * tools: casperjs/phantomjs
 *
 * This test navigates to various payment pages
 * and tests that they display correctly
 *
 * Run command:
 * casperjs test test_payment_pages.js
 *
 * @author J.Stone
 */
var login = 'https://voxy.com/u/login/';
var logout = 'https://voxy.com/u/logout/';
var payment_pages = [
	"https://voxy.com/payment/voxytrial_7_12_120USD_24/?templateId=personalize-3box",
	"https://voxy.com/payment/voxytrial_7_12_0_12/?templateId=personalize-3box",
	"https://voxy.com/payment/voxytrial_7_12_0_52/?templateId=personalize-3box",
	"https://voxy.com/payment/VoxyPremium_12_0_12_notrial/?templateId=inapp-valentines",
	"https://voxy.com/payment/VoxyPremium_12_168USD_24_notrial/?templateId=inapp-valentines-premium",
	"https://voxy.com/payment/VoxyPremium_12_0_12_notrial/?templateId=inapp-valentines",
	"https://voxy.com/payment/VoxyPremium_12_0_52_notrial/?templateId=inapp-valentines",
	"https://voxy.com/payment/VoxyPremium_3_0_8_notrial/?templateId=inapp-3-month-courses",
	"https://voxy.com/payment/VoxyPremium_3_30USD_16_notrial/?templateId=inapp-3-month-courses",
	"https://voxy.com/payment/VoxyPremium_3_0_24_notrial/?templateId=inapp-3-month-courses",
	"https://voxy.com/payment/voxytrial_7_12_150USD_24/?templateId=inapp-full",
	"https://voxy.com/payment/voxytrial_7_12_150USD_52/?templateId=inapp-full",
	"https://voxy.com/payment/VoxyPremium_12_0_24_notrial/?templateId=inapp-monthly",
	"https://voxy.com/payment/voxytutor_20_37/",
	"https://voxy.com/payment/voxytutor_1_0/",
	"https://voxy.com/payment/voxytutor_8_25/",
	"https://voxy.com/payment/VoxyPremium_12_0_12_notrial/?templateId=inapp-stpattys",
	"https://voxy.com/payment/VoxyPremium_12_204USD_48_notrial/?templateId=inapp-stpattys-premium",
	"https://voxy.com/payment/VoxyPremium_12_0_52_notrial/?templateId=inapp-stpattys", 
	"https://voxy.com/compare/guide-stpattys/",
	"https://voxy.com/compare/guide/",
	"https://voxy.com/compare/credits/"
];


//casperjs setup
var utils = require('utils');
var http = require('http');
var fs = require('fs');
var x = require('casper').selectXPath;
var casper = require('casper').create({
// 	 //verbose: true, 
// 	 //ogLevel: 'debug'
});


casper.test.begin("Check for 400 or greater response on ALL payment/compare pages", (payment_pages.length + 2), function(test) {
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

	casper.then(function(response) {
		//navigate to the right payment url
		for (var i = 0; i < payment_pages.length; i++) {
			this.thenOpen(payment_pages[i], function() {
				this.echo(this.getCurrentUrl());							
				this.test.assertHttpStatus(200);
				if(response == undefined || response.status >= 400) {
					this.test.fail("Page Failed to Load: " + this.echo(this.getCurrentUrl()));
				};				
			});
		}
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		test.assertUrlMatch(logout, 'logout url is displayed');
	});

	casper.run(function() {
		test.done();
		this.exit();
	});

});