const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const { createServer } = require('http');
const { errorHandler } = require('./middlewares/error-middleware');
const { SESSION_SECRET } = require('./config/serverConfig');
const ApiRoutes = require('./routes');
const app = express();

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

app.use('/api', ApiRoutes);

app.use(errorHandler);
const httpServer = createServer(app);
module.exports = httpServer;
