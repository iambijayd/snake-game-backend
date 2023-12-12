const PlayerRepository = require('../repository/player-repository');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');
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
	async getPlayer(filter) {
		const player = await this.PlayerRepository.getPlayer(filter);
		return player;
	}
}

module.exports = PlayerService;
