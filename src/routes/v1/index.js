const express = require('express');
const passport = require('passport');
const {
	registerPlayer,
	loginPlayer,
	handleSocialLogin,
} = require('../../controllers/player-controller');
require('../../passport');
const { playOnline } = require('../../controllers/match-controller');
const { verifyJWT } = require('../../middlewares/auth-middleware');
const router = express.Router();

//Authentication Routes
router.post('/register', registerPlayer);
router.post('/login', loginPlayer);

//Game Route
router.post('/play-online', verifyJWT, playOnline);

//OAuth Route
router.get('/login/oauth/google', passport.authenticate('google'));

//callback route
router.get(
	'/login/oauth/google/callback',
	passport.authenticate('google'),
	handleSocialLogin
);
module.exports = router;
