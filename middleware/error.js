const errorHandler = (err, req, res, next) => {
	res.status(err.statusCode || 500).send(err.message || 'Server Error');
};

module.exports = errorHandler;
