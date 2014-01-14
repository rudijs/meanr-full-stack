var config = require('../../config/config'),
  logger = require(config.get('root') + '/config/log'),
  _ = require('lodash'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * Sigin via AngularJS view
 */
exports.signin = function (req, res) {
  res.redirect('/#/signin');
};

/**
 * Auth callback
 */
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

  var email = req.body.email;

  var provider = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };

  var user = new User({
    email: email,
    currentProvider: 'local',
    providers: {}
  });

  user.providers.local = provider;

  user.save(function (err) {
    if (err) {

      var errorMessage = '';

      if (err.code && err.code === 11000) {
        errorMessage = ',This email address already exists';
      }
      else {
        _.keys(err.errors).forEach(function (error) {
          errorMessage += ',* ' + err.errors[error].message;
        });
      }

      logger.error('LocalStrategy create save error: ' + err.toString());
      return res.redirect('/#/signup?errors=Please fix these errors:' + encodeURIComponent(errorMessage));
    }

    logger.info(['New User:', user.email].join(' '));

    req.logIn(user, function (err) {
      if (err) {
        logger.error('LocalStrategy create logIn error: ' + err.toString());
        //return next(err);
        return res.redirect('/500');
      }
      return res.redirect('/');

    });

  });

};
