/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * Auth callback
 */
//exports.authCallback = function(req, res, next) {
exports.authCallback = function (req, res) {
  res.redirect('/');
};

/**
 * Logout
 */
exports.signout = function (req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 */
exports.session = function (req, res) {
  res.redirect('/');
};

/**
 * Create user
 */
exports.create = function (req, res) {

  var user = new User(req.body);

  user.provider = 'local';

  user.save(function (err) {

    if (err) {
      //return res.redirect('/');
      return res.render('/#/signup', {
        errors: err.message,
        user: user
      });
    }

    req.logIn(user, function (err) {

      if (err) {
        return next(err);
      }

      return res.redirect('/');

    });

  });
};
