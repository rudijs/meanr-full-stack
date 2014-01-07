module.exports = function (app, config, passport, auth) {

  // users
  require('./users')(app, config, passport);

  // articles
  require('./articles')(app, config, passport, auth);

  // default route
  var index = require(config.get('root') + '/www/controllers/default');
  app.get('/', index.render);

  // testing
  /*
   app.get('/error', function(req, res, next) {
   // here we cause an error in the pipeline so we see express-winston in action.
   return next(new Error("This is an error and it should be logged"));
   });
   */
};
