const express = require('express');
const passport = require('passport');
const {
	registerPlayer,
	loginPlayer,
	handleSocialLogin,
} = require('../../controllers/player-controller');
require('../../passport');
const router = express.Router();

//Authentication Routes
router.post('/register', registerPlayer);
router.post('/login', loginPlayer);

router.get('/login/oauth/google', passport.authenticate('google'));

//callback route
router.get(
	'/login/oauth/google/callback',
	passport.authenticate('google'),
	handleSocialLogin
);
module.exports = router;
