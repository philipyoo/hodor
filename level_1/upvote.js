var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');

var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:51.0) Gecko/20100101 Firefox/51.0',
    'Content-Type': 'application/x-www-form-urlencoded'
}

var options = {
    uri: "http://54.221.6.249/level1.php",
    method: "POST",
    headers: headers,
    form: {
	'id': '70',
	'holdthedoor': 'submit',
	'key': ''
    }
}

var counter = 1;
var cookie;
(function voter() {
    if (counter <= 10) {
	request.get("http://54.221.6.249/level1.php")
	    .on('response', function(res) {
		cookie = res.headers["set-cookie"][0].slice(12,52);
	    });

	console.log(cookie);
	headers["Cookie"] = "HoldTheDoor=" + cookie;
	console.log(headers);

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
