// Required Modules
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  express = require('express'),
  fs = require('fs'),
  http = require('http'),
  config = require('./config/config'),
  passport = require('passport'),
  logger = require('./config/log');

// Expressjs setup
var app = express();

// Mongodb and Mongoose setup and configs
require('./config/mongodb');

//bootstrap passport config
require('./config/passport')(passport);

// Expressjs configs
require('./config/express')(app, passport);

// Expressjs routes
var routesPath = __dirname + '/www/routes';

var walk = function (path) {
  fs.readdirSync(path).forEach(function (file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(newPath)(app, passport);
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};

walk(routesPath);

//console.log(app.routes);

// Start web server
http.createServer(app).listen(app.get('port'), function () {
  msg = 'Express server listening on port ' + app.get('port') + ' in ' + env + ' mode';
  logger.info(msg);
});
