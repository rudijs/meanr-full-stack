module.exports = function (app, config, passport, auth) {

  // users
  require('./users')(app, config, passport);

  // articles
  require('./articles')(app, config, passport, auth);

  // default route
  var index = require(config.get('root') + '/www/controllers/default');
  app.get('/', index.render);

  // 500 error page
  app.get('/500', function (req, res, next) {
    return next(new Error('500 error response page sent from routes default /500'));
  });

};
