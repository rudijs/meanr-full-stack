'use strict';

module.exports = function (config, app, passport) {

  var users = require(config.get('root') + '/www/controllers/users');

  app.get('/signout', users.signout);

  // Setting up the users api
  app.post('/users', users.create);

  // Local strategy route
  app.post('/users/session',
    passport.authenticate('local', {failureRedirect: '/#/signin?msg=error'}),
    users.session
  );

  // Github strategy oauth routes
  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/#/signin?msg=error'}), users.authCallback);

  // Google strategy oauth routes
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/#/signin?msg=error'}), users.authCallback);

  // Facebook strategy oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_about_me']}));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/#/signin?msg=error'}), users.authCallback);

};