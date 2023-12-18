const { Match } = require('../models');
class MatchRepository {
	async create(matchData) {
		const match = await Match.create(matchData);
		return match;
	}
	async get(filter) {
		const match = await Match.findOne({
			where: filter,
		});
		return match;
	}
	async delete(matchId) {
		const isDeleted = await Match.destroy({
			where: {
				id: matchId,
			},
		});
		return isDeleted;
	}
}
module.exports = MatchRepository;
