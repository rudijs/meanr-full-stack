var config = require('./config'),
  logger = require(config.get('root') + '/config/log'),
  mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy,
  User = mongoose.model('User');

module.exports = function (passport) {

  //Serialize sessions
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findOne({
      _id: id
    }, function (err, user) {
      done(err, user);
    });
  });

  //Use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      User.findOne({email: email}, function (err, user) {

        if (err) {

          logger.error(err.toString());
          return done(err);
        }
        if (!user) {

          logger.error('Unknown user: ' + email);
          return done(null, false, {message: 'Unknown user'});
        }
        if (!user.authenticate(password)) {

          logger.error('Invalid password: ' + email);
          return done(null, false, {message: 'Invalid password'});
        }

        return done(null, user);
      });
    }
  ));

};