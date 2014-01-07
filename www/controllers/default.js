//var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
var config = require('../../config/config'),
  userUtil = require('../utils/user'),
  envUtil = require('../utils/env');

exports.render = function (req, res) {

  var user = userUtil.user(req);

  // If in production use the script minified index.html
  var indexHTML;

  if ('production' === envUtil.getEnv()) {
    indexHTML = config.get('root') + '/dist/index.html';
  }
  else {
    indexHTML = 'index.html';
  }

  res.render(indexHTML, {
    hostname: req.host,
    title: config.get('app').name,
    user: JSON.stringify(user)
  });

};