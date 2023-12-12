const express = require('express');
const {
	registerPlayer,
	loginPlayer,
} = require('../../controllers/player-controller');
const router = express.Router();

router.post('/register', registerPlayer);
router.post('/login', loginPlayer);
module.exports = router;
