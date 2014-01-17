module.exports = function (app) {

  // default route
  var index = require('../controllers/default');
  app.get('/', index.render);

  // 500 error page
  app.get('/500', function (req, res, next) {
    return next(new Error('500 error response page sent from routes default /500'));
  });

};
