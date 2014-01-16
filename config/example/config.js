var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  path = require('path'),
  nconf = require('nconf');

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
nconf.argv()
  .env()
  .file({ file: __dirname + '/env/' + env + '.json' });

// cookie expiration one year from now
var now = new Date();
var oneYear = new Date();
oneYear.setYear(now.getFullYear() + 1);

nconf.defaults({

  root: path.normalize(__dirname + '../../'),

  port: process.env.PORT || 3000,

  cookieKey: 'meanr.sid',

  cookieSecret: 'fwC91tcaEKlWUOtoMS2vneHlm',

  cookieExpire: oneYear.toUTCString(),

  redisSessionSecret: 'eVCbCFxUUG1kq3x5U9tuzUOkg',

  app: {
    name: 'MEANR'
  },

  logMaxFileSize: 1048576,

  logMaxFiles: 10,

  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://meanr.local:3000/auth/facebook/callback'
  },

  github: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://meanr.local:3000/auth/github/callback'
  },

  google: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://meanr.local:3000/auth/google/callback'
  },

  // End-to-End test URLs.
  // Local
  // test = local host work station
  // development = local virtual machine
  // Remote with Sauce Labs
  // staging, qa and production are remote and need a real hostname
  e2e: {
    url: {
      test: 'http://meanr.local:3000',
      development: 'http://dev.meanr.com',
      staging: 'http://staging.meanr.com',
      qa: 'http://qa.meanr.com',
      production: 'http://meanr.com'
    }
  },

  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Sauce Labs
  sauceUser: 'your-sauce-labs-username',
  sauceKey: 'your-sauce-labs-key'
});

module.exports = nconf;
