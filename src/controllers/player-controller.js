const asyncHandler = require('../utils/asyncHandler');
const PlayerService = require('../services/player-service');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { generateTemporaryToken } = require('../utils/helper');
const { NODE_ENV } = require('../config/serverConfig');
const playerService = PlayerService.getInstance();

const generateAccessAndRefreshToken = async (playerId) => {
	try {
		const player = await playerService.getPlayer({ id: playerId });
		const accessToken = await player.generateAccessToken();
		const refreshToken = await player.generateRefreshToken();
		player.refreshToken = refreshToken;
		await player.save();
		return { accessToken, refreshToken };
	} catch (err) {
		throw new ApiError(
			'Something went wrong while generating access token',
			500,
			err
		);
	}
};
const registerPlayer = asyncHandler(async (req, res, next) => {
	const { username, password, email } = req.body;
	const player = await playerService.registerPlayer({
		name: username,
		password,
		email,
	});
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		player.id
	);

	const { hashedToken, unHashedToken, emailVerificationExpiry } =
		generateTemporaryToken();

	player.emailVerificationToken = hashedToken;
	player.emailVerificationExpiry = emailVerificationExpiry;

	await player.save();
	/* -------------------------------send email----------------------------------------------- */

	/* -------------------------------End Send Email ------------------------------------------ */
	const data = {
		id: player.id,
		email: player.email,
		avatar: player.avatar,
		name: player.name,
		isEmailVerified: player.isEmailVerified,
		accessToken,
		refreshToken,
	};
	const response = new ApiResponse(
		'Player registered successfully',
		201,
		data
	);

	const options = {
		httpOnly: true,
		secure: NODE_ENV == 'production',
	};
	res.status(response.statusCode)
		.cookie('accessToken', accessToken, options)
		.cookie('refreshToken', refreshToken, options)
		.json(data);
});

const loginPlayer = asyncHandler(async (req, res, next) => {
	const loginData = {
		email: req.body.email || '',
		name: req.body.name || '',
		password: req.body.password,
	};
	const player = await playerService.loginPlayer(loginData);
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		player.id
	);
	const data = {
		id: player.id,
		email: player.email,
		avatar: player.avatar,
		name: player.name,
		isEmailVerified: player.isEmailVerified,
		accessToken,
		refreshToken,
	};
	const response = new ApiResponse('LoggedIn Successfully', 200, data);

	return res
		.status(200)
		.cookie('accessToken', accessToken)
		.cookie('refreshToken', refreshToken)
		.json(response);
});
const handleSocialLogin = asyncHandler(async (req, res, next) => {
	const playerId = req.user?.id;
	const player = await playerService.getPlayer({ id: playerId });
	if (!player) {
		throw new ApiError('Player donot exist', 404, []);
	}
	const { accessToken, refreshToken } =
		await generateAccessAndRefreshToken(playerId);

	const data = {
		id: player.id,
		email: player.email,
		avatar: player.avatar,
		name: player.name,
		isEmailVerified: player.isEmailVerified,
		accessToken,
		refreshToken,
	};
	const response = new ApiResponse('LoggedIn Successfully', 200, data);
	res.status(200)
		.cookie('accessToken', accessToken)
		.cookie('refreshToken', refreshToken)
		.json(response);
});
module.exports = {
	registerPlayer,
	loginPlayer,
	handleSocialLogin,
};
