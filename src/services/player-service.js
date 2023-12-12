const PlayerRepository = require('../repository/player-repository');
const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');
const { UserLoginType } = require('../constant');
class PlayerService {
	constructor() {
		this.PlayerRepository = new PlayerRepository();
	}
	static getInstance() {
		if (!PlayerService.instance) {
			PlayerService.instance = new PlayerService();
		}
		return PlayerService.instance;
	}
	async registerPlayer(data) {
		let player;
		player = await this.PlayerRepository.getPlayer({
			[Op.or]: [{ email: data.email }, { name: data.name }],
		});
		if (player) {
			throw new ApiError('Player already exists', 400);
		}
		player = await this.PlayerRepository.createPlayer(data);
		return player;
	}
	async loginPlayer(data) {
		const player = await this.PlayerRepository.getPlayer({
			[Op.or]: [{ email: data.email }, { name: data.name }],
		});
		if (!player) {
			throw new ApiError('Entered credentials donot match', 400, []);
		}
		if (player.loginType !== UserLoginType.EMAIL_PASSWORD) {
			throw new ApiError(
				'You are registered using OAuth. Kindly, Use the same way to login.',
				400,
				[]
			);
		}
		const isPasswordCorrect = await player.isPasswordCorrect(data.password);
		if (!isPasswordCorrect) {
			throw new ApiError('Entered credentials donot match', 400, []);
		}
		return player;
	}
	async getPlayer(filter) {
		const player = await this.PlayerRepository.getPlayer(filter);
		return player;
	}
}

module.exports = PlayerService;
