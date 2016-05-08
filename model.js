/**
 * Configuration.
 */

var config = {
    clients: [{
        clientId: 'application',
        clientSecret: 'secret',
        redirectUris: ['']
    }],
    tokens: [],
    users: [{
        id: '123',
        username: 'pedroetb',
        password: 'password'
    }]
};

/**
 * Dump the cache (for debug).
 */

var dump = function() {
    console.log('clients', config.clients);
    console.log('tokens', config.tokens);
    console.log('users', config.users);
};

/*
 * Get access token.
 */

var getAccessToken = function(bearerToken, callback) {

    var tokens = config.tokens.filter(function(token) {
        return token.accessToken === bearerToken;
    });

    return callback(false, tokens[0]);
};

/**
 * Get client.
 */

var getClient = function(clientId, clientSecret, callback) {

    var clients = config.clients.filter(function(client) {
        return client.clientId === clientId &&
            client.clientSecret === clientSecret;
    });

    callback(false, clients[0]);
};

/**
 * Grant type allowed.
 */

var grantTypeAllowed = function(clientId, grantType, callback) {

    callback(false, grantType === "password");
};

/**
 * Save token.
 */

var saveAccessToken = function(accessToken, clientId, expires,
    user,callback) {

    config.tokens.push({
        accessToken: accessToken,
        expires: expires,
        clientId: clientId,
        user: user
    });

    callback(false);
};

/*
 * Get user.
 */

var getUser = function(username, password, callback) {

    var users = config.users.filter(function(user) {
        return user.username === username && user.password === password;
    });

    callback(false, users[0]);
};

/**
 * Export model definition object.
 */

module.exports = {
    getAccessToken: getAccessToken,
    getClient: getClient,
    grantTypeAllowed: grantTypeAllowed,
    saveAccessToken: saveAccessToken,
    getUser: getUser
};
