​
​

# TaxBandits Node Js Sample SDK

This is a sample based on Node Js, Express, Jsonwebtoken and axios to show how to authenticate and handshake with TaxBandits API. This sample includes:

- An endpoint which returns the businesses
- Create Buisness
- Endpoint to generate the W9 embed link
- Uses caching to cache the accesstoken

## Usage:

```$ npm install

#  run with Nodemon
$ npm run server

# Visit http://localhost:9000/api/businesses
```

​

## Configuration

You need to signup with TaxBandits Sandbox Developer Console at https://sandbox.taxbandits.com to get the keys to run the SDK. See below for more directions:

​
**Important**

Create a folder called 'config' at the root and a file called 'default.json' under the 'config' folder to add your client secret, client id, user token and auth/api endpoints.
The file should look like this:

```
{
	"jwtKey": "your client secret",
	"jwtClientId": "your client id",
	"jwtUserToken": "your user token",
	"jwtExpirySeconds": 216000,
	"authUrl": "https://testoauth.expressauth.net/v2/tbsauth",
	"apiUrl": "https://testapi.taxbandits.com/v1.6.1"
}
```

​
​

### To get the sandbox keys:

​

- Go to Sandbox Developer console: https://sandbox.taxbandits.com.
  ​
- Signup or signin to Sandbox
  ​
- Navigate to Settings and then to API Credentials. Copy Client Id, Client Secret and User Token.
  ​

### The sandbox urls: (Please make sure to use the right versions)

​
Sandbox Auth Server: https://testoauth.expressauth.net/v2/tbsauth
​
API Server: https://testapi.taxbandits.com/v1.6.1
​
Sandbox Application URL: https://testapp.taxbandits.com
​
​

## Set up Test data using the Application:

You can go to the Sandbox Application to add sample data.
​

- Login into sandbox application using https://testapp.taxbandits.com
- Once you are on the dashboard, go to “Quicklinks” at the top right and click “Address Book”
- You can add sample business from here
- Now you can run the SDK to receive the number of businesses created with TaxBandits.
