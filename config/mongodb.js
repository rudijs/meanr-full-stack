'use strict';

var logger = require('./log'),
  config = require('./config'),
  mongoose = require('mongoose'),
  requireWalk = require('../www/utils/requireWalk').requireWalk;

// Build the connection string
var dbURI = config.get('database').mongodb.uri;
var dbPort = config.get('database').mongodb.port;
var dbName = config.get('database').mongodb.dbname;

// Mongoose connection events

// Mongoose connecting event
mongoose.connection.on('connecting', function () {
  logger.info('Mongoose connecting to ' + dbURI);
});

// Mongoose conneccted event
mongoose.connection.on('connected', function () {
  logger.info('Mongoose connected to ' + dbURI);
});

// Mongoose open event
mongoose.connection.once('open', function () {
  logger.info('Mongoose connection opened to ' + dbURI);
});

// Mongoose reconnected event
mongoose.connection.on('reconnected', function () {
  logger.info('Mongoose reconnected to ' + dbURI);
});

// Mongoose disconnected event
mongoose.connection.on('disconnected', function () {
  logger.info('Mongoose disconnected');
});

// Mongoose error event
mongoose.connection.on('error', function (error) {
  logger.error('Mongoose: ' + error);
  mongoose.disconnect();
});

// Mongoose SIGINT event
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    logger.info('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

// Create the database connection
mongoose.connect(
  dbURI + ':' + dbPort + '/' + dbName,
  {server: {auto_reconnect: true}}
);

// Bootstrap models
var requireModels = requireWalk(config.get('root') + '/www/models');
requireModels();
