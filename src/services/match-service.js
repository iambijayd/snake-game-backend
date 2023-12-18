const MatchRepository = require('../repository/match-repository');
class MatchService {
	constructor() {
		this.MatchRepository = new MatchRepository();
	}
	static getInstance() {
		if (!MatchService.instance) {
			MatchService.instance = new MatchService();
		}
		return MatchService.instance;
	}
	async createMatch(matchData) {
		const match = await this.MatchRepository.create(matchData);
		return match;
	}
	async getMatch(filter) {
		const match = await this.MatchRepository.get(filter);
		return match;
	}
}
module.exports = MatchService;
