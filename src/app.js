const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { errorHandler } = require('./middlewares/error-middleware');
const { SESSION_SECRET } = require('./config/serverConfig');
const ApiRoutes = require('./routes');
const { CORS_ORIGIN } = require('./config/serverConfig');
const { initializeSocketIo } = require('./sockets');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: CORS_ORIGIN,
});
app.set('io', io);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: SESSION_SECRET,
		saveUninitialized: true,
		resave: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
initializeSocketIo(io);
app.use('/api', ApiRoutes);

app.use(errorHandler);
module.exports = httpServer;
