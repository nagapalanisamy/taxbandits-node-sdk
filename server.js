const express = require('express');
const errorHandler = require('./middleware/error');

const app = express();

//init middleware
app.use(express.json({ extended: false }));

//Define routes for different endpoints
app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/w9', require('./routes/w9'));

//add error handler middleware
//app.use(errorHandler);

const PORT = process.env.PORT || 9000;

//listen to the port defined or to 9000
app.listen(PORT, () => {
	console.log(`server started on ${PORT}`);
});
