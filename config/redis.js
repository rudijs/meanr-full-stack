var config = require('./config'),
  logger = require('./log'),
  redis = require('redis');

var redisClient = redis.createClient(null, config.get('database').redis.ip);

redisClient
  .on('ready', function () {
    logger.info('REDIS ready');
  })
  .on('error', function (err) {
    logger.error('REDIS ' + err.message);
  })
  .on('end', function () {
    logger.info('REDIS disconnect');
  });

module.exports = redisClient;