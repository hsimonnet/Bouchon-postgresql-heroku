var connString = 'postgres://ksaoejgdpfgnvm:b0036a061a969552c0aa56c47907ebfc7fcdc1e43b7e9c3b0263218ab688876b@ec2-23-23-245-89.compute-1.amazonaws.com:5432/d6hji5i2ot7s3k';

var pg = require('pg');
var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {

	pg.connect(connString, function(err, client, done) {
		if(err) response.send("Could not connect to DB: " + err);
		client.query('SELECT * FROM public."MyTable" ORDER BY id ASC', function(err, result) {
			done();
			if(err) return response.send(err);
			response.send(result.rows);
		});
	});
});

app.get('/toto', function(request, response) {

	pg.connect(connString, function(err, client, done) {
		if(err) response.send("Could not connect to DB: " + err);
		client.query('SELECT * FROM public."MyTable" ORDER BY id DESC', function(err, result) {
			done();
			if(err) return response.send(err);
			response.send(result.rows);
		});
	});
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
