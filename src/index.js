const httpServer = require('./app');
const { PORT } = require('./config/serverConfig');

httpServer.listen(PORT, () => {
	console.log('Server listening on port %d', PORT);
});
