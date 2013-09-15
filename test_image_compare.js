

var login_page = 'http://www.voxy.com/u/login/';
var logout = 'http://www.voxy.com/u/logout/';
var landing1 = 'http://voxy.com/landing/web/en/0/9';

var fs = require('fs');
var casper = require('casper').create({
	viewportSize: {
		width: 1024, 
		height: 768
	}	
});


function get_title(arg1) {
	var n = arg1.substring(24, 35);
	var arr = n.split("");

	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == '/') {
			arr[i] = '_';
		}
	}
	return arr.join('');
}



casper.test.begin("Take a screen-shot", 1, function(test) {

	casper.start(landing1, function() {
		this.wait(1000);
		this.echo('current url: ' + this.getCurrentUrl());
	});

/*	casper.thenOpen(compare_page, function() {
		
	});*/

	casper.then(function() {
		/*var ref_image = fs.read('./compare_page.png');*/

		var t = get_title(landing1);

		this.echo(t);		
		this.capture('landing/' + t + '.png');
		
/*		var new_image = fs.read('./realtime_compare_page.png');
		this.test.assert(new_image == ref_image);*/
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