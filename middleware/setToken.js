const jwt = require('jsonwebtoken');
const axios = require('axios');
const config = require('config');
const NodeCache = require('node-cache');

let jwsToken = null;
let accessToken = null;
//cache it for 59 mins
const myCache = new NodeCache();
const KEY_TBSTOKEN = 'KEY_TBSTOKEN';
const cacheDuration = 59 * 60 * 60;

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

//wrapper function as middleware
exports.setAccessToken = async (req, res, next) => {
	const cacheValue = myCache.get(KEY_TBSTOKEN);

	if (cacheValue !== undefined) {
		req.TBSAccessToken = myCache.get(KEY_TBSTOKEN);
	} else {
		generateJws();
		await fetchAccessToken();
		myCache.set(KEY_TBSTOKEN, accessToken, [cacheDuration]);

		req.TBSAccessToken = accessToken;
	}

	next();
};
