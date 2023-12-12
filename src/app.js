const express = require('express');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { errorHandler } = require('./middlewares/error-middleware');
const ApiRoutes = require('./routes');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', ApiRoutes);

app.use(errorHandler);
const httpServer = createServer(app);
module.exports = httpServer;
