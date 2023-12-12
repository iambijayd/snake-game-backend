const { Player } = require('../models');
class PlayerRepository {
	async createPlayer(data) {
		const player = await Player.create(data);
		return player;
	}
	async getPlayer(filter) {
		const player = await Player.findOne({
			where: filter,
		});
		return player;
	}
}
module.exports = PlayerRepository;
