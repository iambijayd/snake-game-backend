process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled rejection at:', promise, ' reason: ', reason);
	process.exit(1);
});
process.on('uncaughtException', (err, origin) => {
	console.error('Uncaught exception:', err, ' origin: ', origin);
	process.exit(1);
});

const httpServer = require('./app');
const { PORT } = require('./config/serverConfig');

httpServer.listen(PORT, () => {
	console.log('Server listening on port %d', PORT);
});
