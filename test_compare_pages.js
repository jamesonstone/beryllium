/**
 * tools: casperjs/phantomjs
 *
 * This test navigates to various compare pages
 * and tests that they display correctly
 *
 * @author J.Stone
 */
var login_page = 'http://voxy.com/u/login/';
var payment1 = 'https://voxy.com/payment/VoxyPremium_12_168USD_24_notrial/?templateId=inapp-valentines-premium'
var logout = 'http://voxy.com/u/logout/';

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
	"https://voxy.com/payment/voxytutor_8_25/"
];

function addLinks(link) {
	this.then
}



//casperjs setup
var x = require('casper').selectXPath;
var casper = require('casper').create({
	 //verbose: true, 
	 //logLevel: 'debug'
});


casper.test.begin("Check for 500 Errors on ALL payment pages", 1, function(test) {
	casper.start(login_page, function() {
		this.fill('form#ajax-login-form', {
		'username':    'newu1@voxy.com',
		'password':    'things'
		}, true);
	});

	casper.then(function() {
		//added wait here because transition to guide wasn't occuring fast enough
		this.wait(1000, function() {
			this.echo(this.getCurrentUrl());
		});
	});

	//casper.thenOpen(payment1, function() {
	casper.then(function() {
		this.wait(1000);
		//navigate to the right payment url
		for (var i = 0; i < payment_pages.length; i++) {
			console.log(payment_pages[i]);
			this.open(payment_pages[i]);
			this.echo(this.getCurrentUrl());
			this.test.assertTextDoesntExist('Error: 500', 'Page ok');
		}
		//image capture here
	});

	casper.thenOpen(logout, function() {
		//dump the current session and logout
		//TODO: add this to teardown
		this.echo('current url: ' + this.getCurrentUrl());
		this.wait(500);
	});

	casper.run(function() {
		test.done();
		this.exit()
	});

});