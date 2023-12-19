const DB_NAME = 'snake_multiplayer_db';
const UserLoginType = {
	GOOGLE: 'GOOGLE',
	EMAIL_PASSWORD: 'EMAIL_PASSWORD',
};
const AvailableSocialLogins = Object.values(UserLoginType);
const EMAIL_VERIFICATION_EXPIRY = 1000 * 60 * 30; //30 minutes

const GOOGLE_CALLBACK_URL =
	'http://localhost:3000/api/v1/login/oauth/google/callback';

const GameEventEnum = Object.freeze({
	CONNECTED_EVENT: 'connected',
	DISCONNECTED_EVENT: 'disconnected',
	JOIN_ROOM_EVENT: 'joinRoom',
	ROOM_FULL_EVENT: 'roomFull',
	LEAVE_ROOM_EVENT: 'leaveRoom',
	INITIATE_RTC_CONNECTION: 'initRTC',
	SOCKET_ERROR_EVENT: 'socketError',
});

module.exports = {
	DB_NAME,
	UserLoginType,
	AvailableSocialLogins,
	EMAIL_VERIFICATION_EXPIRY,
	GOOGLE_CALLBACK_URL,
	GameEventEnum,
};
