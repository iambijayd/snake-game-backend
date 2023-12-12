const DB_NAME = 'snake_multiplayer_db';
const UserLoginType = {
	GOOGLE: 'GOOGLE',
	EMAIL_PASSWORD: 'EMAIL_PASSWORD',
};
const AvailableSocialLogins = Object.values(UserLoginType);
const EMAIL_VERIFICATION_EXPIRY = 1000 * 60 * 30; //30 minutes
module.exports = {
	DB_NAME,
	UserLoginType,
	AvailableSocialLogins,
	EMAIL_VERIFICATION_EXPIRY,
};
