const express = require('express');
const config = require('config');
const axios = require('axios');

const router = express.Router();
const { setAccessToken } = require('../middleware/setToken');

//  @route  GET api/businesses
//  @desc   GET all businesses
//  @access Private
router.get('/', setAccessToken, async (req, res, next) => {
	//get the access token from the auth server
	// const bearerToken = await auth();
	const bearerToken = req.TBSAccessToken;

	const options = {
		headers: {
			Authorization: `Bearer ${bearerToken}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	};
	const endPoint = `${config.get('apiUrl')}/Business/List`;
	try {
		const output = await axios.get(endPoint, options);

		res.status(200).send(output.data.Businesses);
	} catch (err) {
		res.status(err.response.status).send(err.response.data);
	}
});

//  @route  POST api/businesses
//  @desc   Create a single buisness
//  @access Private
router.post('/', setAccessToken, async (req, res, next) => {
	const bearerToken = req.TBSAccessToken;
	const options = {
		headers: {
			Authorization: `Bearer ${bearerToken}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	};
	const endPoint = `${config.get('apiUrl')}/Business/Create`;
	//In this sample, lets worry about the mandatory fields
	const {
		BusinessNm,
		Ein,
		Email,
		ContactNm,
		Phone,
		Address1,
		Address2,
		City,
		State,
		ZipCd,
	} = req.body;

	const businessObj = {
		BusinessNm,
		isEIN: true,
		EINorSSN: Ein,
		Email,
		ContactNm,
		Phone,
		isBusinessTerminated: false,
		USAddress: {
			Address1,
			Address2,
			City,
			State,
			ZipCd,
		},
	};

	try {
		const output = await axios.post(endPoint, businessObj, options);

		res.status(200).send(output.data);
	} catch (err) {
		res.status(err.response.status).send(err.response.data);
	}
});

module.exports = router;
