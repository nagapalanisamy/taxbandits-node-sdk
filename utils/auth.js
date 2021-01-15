const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require('config');

let jwsToken = null;
let accessToken = null;

//This function generates the authentication JWS token
const generateJws = () => {
	//setup the payload with Issuer, Subject, audience and Issued at.
	const payload = {
		iss: config.get('jwtClientId'),
		sub: config.get('jwtClientId'),
		aud: config.get('jwtUserToken'),
		iat: Math.floor(new Date().getTime() / 1000),
	};

	// Create a new JWS token with the payload
	// and expires 1 hour after issue
	jwsToken = jwt.sign(payload, config.get('jwtKey'), {
		expiresIn: config.get('jwtExpirySeconds'),
	});
};

//Fetch the access token by setting the Authentication field in the header.
const fetchAccessToken = async () => {
	//axios needs to be setup with the custom header
	const options = {
		headers: {
			Authentication: jwsToken,
		},
	};

	//call the auth url using axios
	try {
		const res = await axios.get(config.get('authUrl'), options);

		accessToken = res.data.AccessToken;
	} catch (err) {
		console.log(err);
	}
};

//wrapper function
const auth = async () => {
	generateJws();
	await fetchAccessToken();

	return accessToken;
};

module.exports = auth;
