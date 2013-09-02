var homepage = 'http://www.google.com/';
var fs = require('fs');
var casper = require('casper').create({
	 //verbose: true, 
	 //logLevel: 'debug'	
	viewportSize: {
		width: 1024, 
		height: 768
	}	
});

casper.test.begin("Take a screen-shot", 1, function(test) {
	casper.start(homepage);

	casper.then(function() {
		var ref_image = fs.read('./google_test.png');
		
		this.capture('realtime_google_test.png');
		//this.capture('google_test.png');
		
		var new_image = fs.read('./realtime_google_test.png');
		this.test.assert(new_image == ref_image);
	});

	casper.run(function() {
		test.done();
		this.exit();
	});	
});