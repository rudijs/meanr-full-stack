'use strict';

exports.getEnv = function () {
  var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  return env;
};
