var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  winston = require('winston'),
  config = require('./config');

var logger;

if (env === 'production') {

  require('winston-loggly');

  logger = new (winston.Logger)({
    transports: [
      //new (winston.transports.Console)(),
      new (winston.transports.Loggly)({
        inputToken: config.get('loggly').inputToken,
        subdomain: config.get('loggly').subdomain,
        auth: {
          username: config.get('loggly').auth.username,
          password: config.get('loggly').auth.password
        },
        json: true
      })
    ]
  });

}
else {

  winston.remove(winston.transports.Console);

  logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({
        filename: config.get('root') + '/log/' + env + '.log',
        maxsize: config.get('logMaxFileSize'),
        maxfiles: 10
      })
    ]
  });

}

module.exports = logger;
