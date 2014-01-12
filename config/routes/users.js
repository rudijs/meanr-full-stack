module.exports = function (app, config, passport) {

  var users = require(config.get('root') + '/www/controllers/users');

  app.get('/signout', users.signout);

  // Setting up the users api
  app.post('/users', users.create);

  // Local strategy route
  app.post('/users/session', passport.authenticate('local', {
    failureRedirect: '/#/signin?msg=error',
    failureFlash: 'Invalid email or password.'
  }), users.session);

  // Github strategy oauth routes
  app.get('/auth/github', passport.authenticate('github', {
    failureRedirect: '/#/signin?msg=error'
  }), users.signin);

  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/#/signin?msg=error'
  }), users.authCallback);

  // Google strategy oauth routes
  app.get('/auth/google', passport.authenticate('google', {
    failureRedirect: '/#/signin?msg=error',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }), users.signin);

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/#/signin?msg=error'
  }), users.authCallback);

  //app.get('/users/me', auth.requiresLogin, users.me);

};