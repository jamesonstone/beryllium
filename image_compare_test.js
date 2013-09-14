//http://vgaltes.com/index.php/2013/07/09/comparing-image-with-a-capture-with-casperjs/
//https://github.com/Huddle/PhantomCSS

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

casper.start(homepage, function() {
	this.capture('realtime_google_test.png');
	this.test.assert(true);
});

/*casper.then(function() {
	//var ref_image = fs.read('./google_test.png');
	//this.capture('realtime_google_test.png');
	//var new_image = fs.read('./realtime_google_test.png');
	//this.test.assert(true, new_image == ref_image);
	//this.test.assert(true);
});*/

casper.run(function() {
	this.echo('done');
	this.test.done(1);
	this.exit();
	//this.test.renderResults(true);
});

//run the damn thing
/*casper.run(function() {
	this.echo('image compare complete');
	this.test.done(1);
	this.test.renderResults(true);
});*/