const DB_NAME = 'snake_multiplayer_db';
const UserLoginType = {
	GOOGLE: 'GOOGLE',
	EMAIL_PASSWORD: 'EMAIL_PASSWORD',
};
const AvailableSocialLogins = Object.values(UserLoginType);
const EMAIL_VERIFICATION_EXPIRY = 1000 * 60 * 30; //30 minutes

const GOOGLE_CALLBACK_URL =
	'http://localhost:3000/api/v1/login/oauth/google/callback';
module.exports = {
	DB_NAME,
	UserLoginType,
	AvailableSocialLogins,
	EMAIL_VERIFICATION_EXPIRY,
	GOOGLE_CALLBACK_URL,
};
