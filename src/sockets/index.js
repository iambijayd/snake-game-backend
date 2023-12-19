const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config/serverConfig');
const ApiError = require('../utils/ApiError');
const { GameEventEnum } = require('../constant');
const PlayerService = require('../services/player-service');
const playerService = PlayerService.getInstance();

const mountJoinRoomEvent = (socket, io) => {
	/**
	 * roomCode -> json object
	 */
	socket.on(GameEventEnum.JOIN_ROOM_EVENT, ({ roomCode }) => {
		const room = io.sockets.adapter.rooms.get(roomCode); // returns Set()
		if (!room || room?.size < 2) {
			socket.join(roomCode);
			if (room?.size == 2) {
				socket.broadcast.emit(GameEventEnum.INITIATE_RTC_CONNECTION, {
					message: `${socket.player.name} joined the game.`,
				});
			}
		} else {
			socket.emit(GameEventEnum.ROOM_FULL_EVENT, {
				message: 'Room is Full',
			});
		}
	});
};
const initializeSocketIo = (io) => {
	return io.on('connection', async (socket) => {
		try {
			//parse the cookies from handshake headers
			const cookies = cookie.parse(
				typeof socket.handshake.headers?.cookie === 'string'
					? socket.handshake.headers?.cookie
					: ''
			);
			let token = cookies?.accessToken;
			if (!token) {
				//If there is no token in cookies check handshake auth
				token = socket.handshake.auth?.token;
			}
			console.log(socket.handshake);
			if (!token) {
				throw new ApiError(
					'Handshake Unauthorized, Token not present',
					401
				);
			}
			const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
			console.log(decodedToken);
			const player = await playerService.getPlayer({
				id: decodedToken.id,
			});
			if (!player) {
				throw new ApiError('Invalid token', 401);
			}
			socket.player = player;
			mountJoinRoomEvent(socket, io);
		} catch (error) {
			socket.emit(
				GameEventEnum.SOCKET_ERROR_EVENT,
				error?.message ||
					'Something went wrong connecting to the socket'
			);
		}
	});
};
module.exports = {
	initializeSocketIo,
};
