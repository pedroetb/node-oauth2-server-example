# node-oauth2-server example

This is a basic example of a OAuth2 server, using [node-oauth2-server](https://github.com/thomseddon/node-oauth2-server/) with the minimum (only the required to work) model configuration.

## Setup

Install **nodejs** and **npm** and then, simply run `npm install` and `npm start`. The server should now be running at `http://localhost:3000`.

## Usage

There is one client added to server and ready to work:

* **clientId**: `application`
* **secret**: `secret`

And there is also one existing user:

* **username**: `pedroetb`
* **password**: `password`

### Obtain a token

To obtain a token you should POST to `http://localhost:3000/oauth/token`, including the client credentials in the headers and the user credentials in the request body:

* **Headers**
    * **Authorization**: `"Basic " + clientId:secret base64'd`
        * (for example, to use `application:secret`, you should send `Basic YXBwbGljYXRpb246c2VjcmV0`)

    * **Content-Type**: `application/x-www-form-urlencoded`
* **Body**
    * `grant_type=password&username=pedroetb&password=password`

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
