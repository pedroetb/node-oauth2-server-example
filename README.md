# node-oauth2-server example

This is a basic example of a OAuth2 server, using [node-oauth2-server](https://github.com/oauthjs/node-oauth2-server) with the minimum (only the required to work) model configuration.

If you want an example with a better data management system, you should go to [node-oauth2-server-mongo-example](https://github.com/pedroetb/node-oauth2-server-mongo-example) instead.

## Setup

Install **nodejs** and **npm** and then, simply run `npm install` and `npm start`. The server should now be running at `http://localhost:3000`.

## Usage

You can use different grant types to get an access token. By now, `password` and `client_credentials` are available.

### Checking example data

#### With *password* grant

There is one client added to server and ready to work:

* **clientId**: `application`
* **secret**: `secret`

And there is also one existing user:

* **username**: `pedroetb`
* **password**: `password`

#### With *client_credentials* grant

There is one confidential client added to server and ready to work:

* **clientId**: `confidentialApplication`
* **secret**: `topSecret`

You don't need any user to use this grant type, but for security is only available to confidential clients.

### Obtaining a token

To obtain a token you should POST to `http://localhost:3000/oauth/token`.

#### With *password* grant

You need to include the client credentials in request headers and the user credentials and grant type in request body:

* **Headers**
	* **Authorization**: `"Basic " + clientId:secret base64'd`
		* (for example, to use `application:secret`, you should send `Basic YXBwbGljYXRpb246c2VjcmV0`)

	* **Content-Type**: `application/x-www-form-urlencoded`
* **Body**
	* `grant_type=password&username=pedroetb&password=password`
		* (contains 3 parameters: `grant_type`, `username` and `password`)

For example, using `curl`:
```
curl http://localhost:3000/oauth/token \
  -d "grant_type=password" \
  -d "username=pedroetb" \
  -d "password=password" \
  -H "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

#### With *client_credentials* grant

You need to include the client credentials in request headers and the grant type in request body:

* **Headers**
	* **Authorization**: `"Basic " + clientId:secret base64'd`
		* (for example, to use `confidentialApplication:topSecret`, you should send `Basic Y29uZmlkZW50aWFsQXBwbGljYXRpb246dG9wU2VjcmV0`)

	* **Content-Type**: `application/x-www-form-urlencoded`
* **Body**
	* `grant_type=client_credentials`

For example, using `curl`:
```
curl http://localhost:3000/oauth/token \
  -d "grant_type=client_credentials" \
  -H "Authorization: Basic Y29uZmlkZW50aWFsQXBwbGljYXRpb246dG9wU2VjcmV0" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

If all goes as planned, you should receive a response like this:

```
{
	"token_type": "bearer",
	"access_token": "72ab415822b56cf0f9f93f07fe978d9aae859325",
	"expires_in": 3600
}
```

### Using the token

Now, you can use your brand-new token to access restricted areas. For example, you can GET to `http://localhost:3000/` including your token at headers:

* **Headers**
	* **Authorization**: `"Bearer " + access_token`
		* (for example, `Bearer 72ab415822b56cf0f9f93f07fe978d9aae859325`)

For example, using `curl`:
```
curl http://localhost:3000 \
  -H "Authorization: Bearer 72ab415822b56cf0f9f93f07fe978d9aae859325"
```
