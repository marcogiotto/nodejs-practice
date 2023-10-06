const { format } = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

const logEvents = async (message, fileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\r\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName + '.txt'), logItem);
    } catch (error) {
        console.log(error);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog');
    next();
}

module.exports = { logger, logEvents };