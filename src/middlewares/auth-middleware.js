const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const PlayerService = require('../services/player-service');
const { ACCESS_TOKEN_SECRET } = require('../config/serverConfig');
const ApiError = require('../utils/ApiError');
const playerService = PlayerService.getInstance();
export const verifyJWT = asyncHandler(async (req, res, next) => {
	const token =
		req.cookies?.accessToken ||
		req.header?.['Authorization'].replace('Bearer ', '');
	if (!token) {
		throw new ApiError('Unauthorized request', 401);
	}
	try {
		const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
		const player = await playerService.getPlayer(decodedToken.id);
		delete player.dataValues.password;
		req.player = player;
		next();
	} catch (err) {
		next(err);
	}
});
