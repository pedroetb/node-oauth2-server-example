/**
 * Configuration.
 */

var config = {
	clients: [{
		clientId: 'application',
		clientSecret: 'secret'
	}],
	confidentialClients: [{
		clientId: 'confidentialApplication',
		clientSecret: 'topSecret',
		grants: [
			'client_credentials'
		],
		redirectUris: []
	}],
	tokens: [],
	users: [{
		id: '123',
		username: 'pedroetb',
		password: 'password'
	}]
};

/**
 * Dump the memory storage content (for debug).
 */

var dump = function () {

	console.log('clients', config.clients);
	console.log('confidentialClients', config.confidentialClients);
	console.log('tokens', config.tokens);
	console.log('users', config.users);
};

/*
 * Methods used by all grant types.
 */

var getAccessToken = function (token) {
	var tokens = config.tokens.filter(function (savedToken) {
		if(savedToken.accessToken === token)
			return savedToken;
	});

	return tokens[0] || null;
};

var getClient = function (clientId, clientSecret) {
	var clients = config.clients.filter(function (client) {
		if (client.clientId === clientId && client.clientSecret === clientSecret) {
			return client;
		}
	});

	var confidentialClients = config.confidentialClients.filter(function (client) {
		if (client.clientId === clientId && client.clientSecret === clientSecret) {
			return client;
		}
	});

	return clients[0] || confidentialClients[0];
};

var saveToken = function (token, client, user) {
	var data = {
		accessToken: token.accessToken,
		accessTokenExpiresAt: token.accessTokenExpiresAt,
		client: client,
		clientId: client.clientId,
		refreshToken: token.refreshToken,
		refreshTokenExpiresAt: token.refreshTokenExpiresAt,
		user: user
	};

	config.tokens.push(data);
	return data;
};

/*
 * Method used only by password grant type.
 */

var getUser = function (username, password) {
	var users = config.users.filter(function (user) {
		return user.username === username && user.password === password;
	});

	return users[0] || null;
};

/*
 * Method used only by client_credentials grant type.
 */

var getUserFromClient = function (client) {
	var clients = config.confidentialClients.filter(function (confidentialClient) {
		return confidentialClient.clientId === client.clientId && confidentialClient.clientSecret === client.clientSecret;
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
