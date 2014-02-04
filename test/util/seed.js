'use strict';

var config = require('../../config/config'),
  logger = require(config.get('root') + '/config/log');

// Mongodb and Mongoose setup and configs
require(config.get('root') + '/config/mongodb');

var mongoose = require('mongoose'),
  User = mongoose.model('User');

// Configure Winston logger by using it here, this make the controller log to the test log file.
logger.info('Test Suite Seed: ' + new Date().toString());


var user = new User({
  email: 'net@citizen.com',
  currentProvider: 'local',
  providers: {
    local: {
      name: 'Net Citizen',
      username: 'netcitizen',
      password: 'abcdef'
    }
  }
});

mongoose.connection.on('connected', function () {

  user.save(function (err) {
    if (err) {
      throw new Error(err.toString());
    }
    mongoose.disconnect();
    process.exit(0);
  });

});



