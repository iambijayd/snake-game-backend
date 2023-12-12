require('dotenv').config();
module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
	REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
};
