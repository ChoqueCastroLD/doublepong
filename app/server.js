require('mandatoryenv').load([
    'PORT',
    'SECRET'
]);

// Import modules
const whiz_logger = require('whiz-logger');
const express = require('express');

const mainRouter = require('./routes/router.js');

// Server instance configuration
const app = express();

// Set logger
global.logger = whiz_logger({
    logDirectory: 'logs'
});

// Set logger middleware
app.use(logger.middleware);

// Load router
app.use(mainRouter);

// Handle Not Found
app.get('*', (req, res) => {
    res.json({status: false, message: 'Not found'});
})

// Handle Errors
app.use((err, req, res, next) => {
    logger.error(err);
    res.json({status: false, message: 'Server errored, check log'});
})

// Open Server on Port
app.listen(env.PORT, () => logger.info(`Server running on port: ${env.PORT}`));