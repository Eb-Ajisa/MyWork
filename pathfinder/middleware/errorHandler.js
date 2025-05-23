const { logEvents } = require('./logEvents.js');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack);
    res.status(500).send({ error: err.message });
};

module.exports = errorHandler;
