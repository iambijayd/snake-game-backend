const asyncHandler = require('../utils/asyncHandler');
const MatchService = require('../services/match-service');
const ApiResponse = require('../utils/ApiResponse');
const { generateRandomCode } = require('../utils/helper');
const matchService = new MatchService();
const playOnline = asyncHandler(async (req, res, next) => {
	let match = await matchService.getMatch({
		isSearching: true,
		isFinished: false,
	});
	if (!match) {
		let code;
		let roomExists;
		do {
			code = generateRandomCode();
			roomExists = await matchService.getMatch({ roomcode: code });
		} while (roomExists);
		match = await matchService.createMatch({
			player1Id: req.player.id,
			roomcode: code,
			isSearching: true,
		});
	} else {
		match.player2Id = req.player.id;
		match.isSearching = false;
		await match.save();
	}
	const responseData = {
		isSearching: match.isSearching,
		roomcode: match.roomcode,
		duration: match.duration,
	};
	const response = new ApiResponse(
		'Establishing connection...',
		200,
		responseData
	);
	return res.status(response.statusCode).json(response);
});

module.exports = {
	playOnline,
};
