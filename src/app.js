const express = require('express');
const { createServer } = require('http');
const { errorHandler } = require('./middlewares/error-middleware');

const app = express();

const httpServer = createServer(app);

app.use(errorHandler);

module.exports = httpServer;
