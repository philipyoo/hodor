var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:51.0) Gecko/20100101 Firefox/51.0',
    'Content-Type': 'application/x-www-form-urlencoded'
}

var options = {
    uri: "http://54.221.6.249/level0.php",
    method: "POST",
    headers: headers,
    form: {
	'id': '70',
	'holdthedoor': 'submit'
    }
}


var counter = 1;
(function voter() {
    if (counter <= 1024) {
	request(options, function(err, res, body) {
	    if (err) {
		console.log("Error: " + err);
	    }

	    var $ = cheerio.load(body, {ignoreWhitespace: true});

	    $('tr').each(function(i, el) {
		var tr = $(this).text().trim().split(" ").filter(Boolean);
		if (tr[0] === '70') {
		    counter = parseInt(tr[1]);
		}
	    });

	    voter();
	});
    }
}());
