const express = require('express');
const { registerPlayer } = require('../../controllers/player-controller');
const router = express.Router();

router.post('/register-player', registerPlayer);

module.exports = router;
