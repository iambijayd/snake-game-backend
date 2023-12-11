const DB_NAME = 'snake_multiplayer_db';
const UserLoginType = {
	GOOGLE: 'GOOGLE',
	EMAIL_PASSWORD: 'EMAIL_PASSWORD',
};
const AvailableSocialLogins = Object.values(UserLoginType);
module.exports = {
	DB_NAME,
	UserLoginType,
	AvailableSocialLogins,
};
