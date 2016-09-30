/**
 * Built-in Log Configuration
 */

const winston = require('winston');
const path = require('path');

const logger = new(winston.Logger)({
  transports: [
    new (winston.transports.Console)({}),
    new (require('winston-daily-rotate-file'))({
      dirname: path.resolve('logs'),
      datePattern: '.yyyy-MM-dd.log',
      filename: 'vs',
      prettyPrint: true,
      timestamp: true,
      level: 'error'
    })
  ]
});

module.exports.log = {
  level: 'verbose',
  custom: logger
};
