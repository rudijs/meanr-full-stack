var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  express = require('express'),
  http = require('http'),
  config = require('./config/config'),
  passport = require('passport'),
  logger = require('./config/log'),
  requireWalk = require('./www/utils/requireWalk').requireWalk;

// Expressjs setup
var app = express();

// Mongodb and Mongoose setup and configs
require('./config/mongodb');

//bootstrap passport config
require('./config/passport')(passport);

// Expressjs configs
require('./config/express')(app, passport);

// Expressjs routes
var requireRoutes = requireWalk(config.get('root') + '/www/routes');
requireRoutes(config, app, passport);

// Start web server
http.createServer(app).listen(app.get('port'), function () {
  msg = 'Express server listening on port ' + app.get('port') + ' in ' + env + ' mode';
  logger.info(msg);
});
