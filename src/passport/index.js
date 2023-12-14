const { OAuth2Strategy } = require('passport-google-oauth');
const {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
} = require('../config/serverConfig');
const { GOOGLE_CALLBACK_URL, UserLoginType } = require('../constant');
const PlayerService = require('../services/player-service');
const playerService = PlayerService.getInstance();
const passport = require('passport');
const ApiError = require('../utils/ApiError');

passport.serializeUser((player, done) => {
	done(null, player.id);
});

passport.deserializeUser(async (playerId, done) => {
	try {
		const player = await playerService.getPlayer({ id: playerId });
		if (player) {
			return done(null, player);
		}
		done(new ApiError('User donot exist', 404, null));
	} catch (err) {
		done(
			new ApiError(
				'Something went wrong while deserializing user.',
				500,
				err
			),
			null
		);
	}
});

passport.use(
	new OAuth2Strategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: GOOGLE_CALLBACK_URL,
			scope: ['profile', 'email'],
		},
		async function verify(_, __, profile, next) {
			try {
				console.log(profile);
				const player = await playerService.getPlayer({
					email: profile._json.email,
				});
				if (player) {
					if (player.loginType !== UserLoginType.GOOGLE) {
						const error = new ApiError(
							`You are registered using ${player.loginType} method, kindly use the same method`,
							400,
							[]
						);
						return next(error, null);
					} else {
						next(null, player);
					}
				} else {
					const userNameExists = await playerService.getPlayer({
						name: profile._json.name,
					});
					let name;
					if (userNameExists) {
						name = profile._json.email.split('@')[0];
						name = name.replace(/\d+/g, '');
					} else {
						name = profile._json.name;
					}
					const playerData = {
						email: profile._json.email,
						name,
						avatar: profile._json.picture,
						isEmailVerified: true,
						password: profile._json.sub, // profile id as password
						loginType: UserLoginType.GOOGLE,
					};
					const player = await playerService.createPlayer(playerData);
					next(null, player);
				}
			} catch (error) {
				next(error, null);
			}
		}
	)
);
