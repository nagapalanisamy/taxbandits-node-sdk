const express = require('express');
const config = require('config');
const axios = require('axios');

const router = express.Router();
const { setAccessToken } = require('../middleware/setToken');

//  @route  GET api/w9/getW9Url/:ein/:payeeaccountnum
//  @desc   GET the w9 url to embed like in an iframe for a particular payee (recipient). The account number is anyting the client can specify and it just needs to be unique for a payee
//  @access Private
router.get(
	'/getW9Url/:ein/:payeeAccountNum',
	setAccessToken,
	async (req, res, next) => {
		//get the access token from the req as set by the middleware

		const bearerToken = req.TBSAccessToken;
		const { ein, payeeAccountNum } = req.params;

		const options = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		};
		//It is enough to pass the account number to get a unique url
		//we can also specify a business id instead of EIN
		const endPoint = `${config.get(
			'apiUrl'
		)}/FormW9Url/GetUrl?Tin=${ein}&AccountNum=${payeeAccountNum}`;

		try {
			const output = await axios.get(endPoint, options);

			res.status(200).send(output.data);
		} catch (err) {
			res.status(err.response.status).send(err.response.data);
		}
	}
);

//  @route  GET api/w9/status/:payeeaccountnum
//  @desc   GET the ststus of w9 for a particular payee (recipient).
//  @access Private
router.get(
	'/status/:payeeAccountNum',
	setAccessToken,
	async (req, res, next) => {
		//get the access token from the req as set by the middleware

		const bearerToken = req.TBSAccessToken;
		const { payeeAccountNum } = req.params;

		const options = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		};

		const endPoint = `${config.get(
			'apiUrl'
		)}/FormW9Url/status?AccountNum=${payeeAccountNum}`;

		try {
			const output = await axios.get(endPoint, options);

			res.status(200).send(output.data);
		} catch (err) {
			res.status(err.response.status).send(err.response.data);
		}
	}
);

//  @route  GET api/w9/get/:payeeaccountnum
//  @desc   GET all the w9 data for a particular payee (recipient) if there is atleast one w9 completion.
//  @access Private
router.get('/get/:payeeAccountNum', setAccessToken, async (req, res, next) => {
	//get the access token from the req as set by the middleware

	const bearerToken = req.TBSAccessToken;
	const { payeeAccountNum } = req.params;

	const options = {
		headers: {
			Authorization: `Bearer ${bearerToken}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	};

	const endPoint = `${config.get(
		'apiUrl'
	)}/FormW9Url/get?AccountNum=${payeeAccountNum}`;

	try {
		const output = await axios.get(endPoint, options);

		res.status(200).send(output.data);
	} catch (err) {
		res.status(err.response.status).send(err.response.data);
	}
});

//  @route  GET api/w9/get/:ein/:accountNum
//  @desc   GET all the w9 data for a particular business(payer) if there is atleast one w9 completion.
//  @access Private
router.get(
	'/get/:ein/:payeeAccountNum',
	setAccessToken,
	async (req, res, next) => {
		//get the access token from the req as set by the middleware

		const bearerToken = req.TBSAccessToken;
		const { ein, payeeAccountNum } = req.params;

		const options = {
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		};

		const endPoint = `${config.get(
			'apiUrl'
		)}/FormW9Url/get?TIN=${ein}&AccountNum=${payeeAccountNum}`;

		try {
			const output = await axios.get(endPoint, options);

			res.status(200).send(output.data);
		} catch (err) {
			res.status(err.response.status).send(err.response.data);
		}
	}
);
module.exports = router;
