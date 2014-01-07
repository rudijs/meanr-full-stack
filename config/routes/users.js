module.exports = function (app, config, passport) {

  var users = require(config.get('root') + '/www/controllers/users');

  app.get('/signout', users.signout);

  //Setting up the users api
  app.post('/users', users.create);

  app.post('/users/session', passport.authenticate('local', {
    failureRedirect: '/#/signin?msg=error',
    failureFlash: 'Invalid email or password.'
  }), users.session);

  //app.get('/users/me', auth.requiresLogin, users.me);

};