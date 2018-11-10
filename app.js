var express = require('express'),
	bodyParser = require('body-parser'),
	oauthServer = require('oauth2-server'),
	Request = oauthServer.Request,
	Response = oauthServer.Response;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.oauth = new oauthServer({
	model: require('./model.js'),
	grants: ['password', 'client_credentials'],
	accessTokenLifetime: 4 * 60 * 60,
	debug: true
});

app.all('/oauth/token', function (req, res) {
	var request = new Request(req);
	var response = new Response(res);

	app.oauth.token(request, response)
		.then(function (token) {
			return res.json(token);
		}).catch(function (err) {
			return res.status(500).json(err);
		});
});

app.get('/', function (req, res, next) {
	var request = new Request(req);
	var response = new Response(res);

	app.oauth.authenticate(request, response)
		.then(function (token) {
			next();
		}).catch(function (err) {
			res.status(err.code || 500).json(err);
		});
}, function (req, res) {
	res.send('Congratulations, you are in a secret area!');
});

app.listen(3000);
