/**
 * tools: casperjs/phantomjs
 *
 * This script grabs all the links on the page
 * and checks them for a 200 and then continues
 * to the next level of links and repeats the process
 * 
 * Run command:
 * casperjs test test_payment_pages.js
 *
 * @author J.Stone
 */
var login = 'https://voxy.com/u/login/';
var logout = 'https://voxy.com/u/logout/';
var pages = [
	"https://voxy.com/"
];

//grab the page links
function getLinks() {
	var links = document.querySelectorAll('a');
	return Array.prototype.map.call(links, function(a) {
		return a.getAttribute('href');
	});
} 


//casperjs setup
var utils = require('utils');
var http = require('http');
var x = require('casper').selectXPath;
var casper = require('casper').create({
 	 // verbose: true, 
 	 // logLevel: 'debug'
});


var show_links = new Array();
var i;

casper.test.begin('check: ' + pages[0], 0, function(test) {
	casper.start(pages[0], function() {
		links = this.evaluate(getLinks);
		for(i = links.length; i--;) {
			if(links[i] != '/' && links[i] != '' &&
			 links[i] != ' ' && links[i] != '#' && links[i].indexOf('i18n/setlang/') == -1 &&
			 links[i] != 'javascript:void(0);' && links[i] != 'mailto:support@voxy.com') {
			 	if(links[i].charAt(0) == 'h') {
					show_links.push(links[i]);
			 	} else {
			 		show_links.push('https://voxy.com' + links[i]);
			 		
			 	}	
			}
		};
		show_links.sort();
	});

	//check each link for < 400 response
	casper.then(function(response) {
		for (var d = 0; d < show_links.length; d++) {
			this.thenOpen(show_links[d], function() {
				this.echo(this.getCurrentUrl());							
				this.test.assertHttpStatus(200);
				if(response == undefined || response.status >= 400) {
					this.test.fail("Page Failed to Load: " + this.echo(this.getCurrentUrl()));
				};				
			});
		}
	});	

	casper.run(function() {
		this.echo(show_links.length + ' links found');
		//this.echo(' - ' + show_links.join('\n - '));
		this.exit();
	});
});








// casper.test.begin("Check for 400 or greater response on pages", (payment_pages.length + 2), function(test) {
// 	casper.start(login, function() {
// 		this.fill('form#ajax-login-form', {
// 		'username':    'newu1@voxy.com',
// 		'password':    'things'
// 		}, true);
// 	});

// 	casper.then(function() {
// 		this.wait(1000, function() {
// 			//check for the substring "guide/recommend/" in the url
// 			this.test.assert((this.getCurrentUrl().indexOf("guide/recommend/") != -1), "guide is displayed");
// 		});
// 	});

// 	casper.then(function(response) {
// 		//navigate to the right payment url
// 		for (var i = 0; i < payment_pages.length; i++) {
// 			this.thenOpen(payment_pages[i], function() {
// 				this.echo(this.getCurrentUrl());							
// 				this.test.assertHttpStatus(200);
// 				if(response == undefined || response.status >= 400) {
// 					this.test.fail("Page Failed to Load: " + this.echo(this.getCurrentUrl()));
// 				};				
// 			});
// 		}
// 	});

// 	casper.thenOpen(logout, function() {
// 		//dump the current session and logout
// 		test.assertUrlMatch(logout, 'logout url is displayed');
// 	});

	// casper.run(function() {
	// 	//test.done();
	// 	this.exit();
	// });

//});