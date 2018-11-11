/**
 * Configuration.
 */

var config = {
	clients: [{
		clientId: 'application',
		clientSecret: 'secret',
		grants: [
			'password'
		],
		redirectUris: []
	}],
	confidentialClients: [{
		clientId: 'confidentialApplication',
		clientSecret: 'topSecret',
		grants: [
			'password',
			'client_credentials'
		],
		redirectUris: []
	}],
	tokens: [],
	users: [{
		username: 'pedroetb',
		password: 'password'
	}]
};

/**
 * Dump the memory storage content (for debug).
 */

var dump = function() {

	console.log('clients', config.clients);
	console.log('confidentialClients', config.confidentialClients);
	console.log('tokens', config.tokens);
	console.log('users', config.users);
};

/*
 * Methods used by all grant types.
 */

var getAccessToken = function(token) {

	var tokens = config.tokens.filter(function(savedToken) {

		return savedToken.accessToken === token;
	});

	return tokens[0];
};

var getClient = function(clientId, clientSecret) {

	var clients = config.clients.filter(function(client) {

		return client.clientId === clientId && client.clientSecret === clientSecret;
	});

	var confidentialClients = config.confidentialClients.filter(function(client) {

		return client.clientId === clientId && client.clientSecret === clientSecret;
	});

	return clients[0] || confidentialClients[0];
};

var saveToken = function(token, client, user) {

	var data = {
		accessToken: token.accessToken,
		accessTokenExpiresAt: token.accessTokenExpiresAt,
		refreshToken: token.refreshToken,
		refreshTokenExpiresAt: token.refreshTokenExpiresAt,
		client: client,
		user: user
	};

	config.tokens.push(data);

	return data;
};

/*
 * Method used only by password grant type.
 */

var getUser = function(username, password) {

	var users = config.users.filter(function(user) {

		return user.username === username && user.password === password;
	});

	return users[0];
};

/*
 * Method used only by client_credentials grant type.
 */

var getUserFromClient = function(client) {

	var clients = config.confidentialClients.filter(function(savedClient) {

		return savedClient.clientId === client.clientId && savedClient.clientSecret === client.clientSecret;
	});

	return clients[0];
};

/**
 * Export model definition object.
 */

module.exports = {
	getAccessToken: getAccessToken,
	getClient: getClient,
	saveToken: saveToken,
	getUser: getUser,
	getUserFromClient: getUserFromClient
};
