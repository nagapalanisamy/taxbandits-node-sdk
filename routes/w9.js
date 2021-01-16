const express = require('express');
const config = require('config');
const axios = require('axios');
const ErrorResponse = require('../utils/errorResponse');
const router = express.Router();
const { setAccessToken } = require('../middleware/setToken');

//  @route  GET api/w9/getW9Url/:payeeId
//  @desc   GET the w9 url to embed like in an iframe for a particular payee (recipient)
//  @access Private
router.get('/getW9Url/:payeeId', setAccessToken, async (req, res, next) => {
	//get the access token from the req as set by the middleware

	const bearerToken = req.TBSAccessToken;

	const options = {
		headers: {
			Authorization: `Bearer ${bearerToken}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	};
	const endPoint = `${config.get(
		'apiUrl'
	)}/Utility/FormW9Iframe?PayeeIdentifier=${req.params.payeeId}`;

	try {
		const output = await axios.get(endPoint, options);

		res.status(200).send(output.data);
	} catch (err) {
		return next(
			new ErrorResponse(
				JSON.stringify(err.response.data.Errors),
				err.response.data.StatusCode
			)
		);
	}
});

module.exports = router;
