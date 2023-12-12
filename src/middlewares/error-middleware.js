const ApiError = require('../utils/ApiError');
const { NODE_ENV } = require('../config/serverConfig');
const errorHandler = (err, _, res, __) => {
	let error = err;
	if (!(error instanceof ApiError)) {
		const message = error.message || 'Something went wrong';
		const code = error.statusCode || 500;
		error = new ApiError(message, code, error.errors || [], error.stack);
	}
	res.status(error.statusCode).json({
		...error,
		message: error.message,
		...(NODE_ENV == 'development' ? { stack: error.stack } : {}),
	});
};

module.exports = {
	errorHandler,
};
