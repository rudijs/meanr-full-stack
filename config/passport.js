var config = require('./config'),
  logger = require(config.get('root') + '/config/log'),
  mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy,
  GitHubStrategy = require('passport-github').Strategy,
  GoogleStrategy = require('passport-google').Strategy,
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

  // Use local strategy
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
          logger.error('Auth Error: Unknown user: ' + email);
          return done(null, false);
        }

        if (!user.providers.local) {
          logger.error('Auth Error: User has no LocalStrategy: ' + email);
          return done(null, false);
        }

        if (!user.authenticate(password)) {
          logger.error('Auth Error: Invalid password: ' + email);
          return done(null, false);
        }

        // An email can have several providers which can have different values for the user's name
        // Update and save the currentProvider property so that when passportjs deserializes
        // in future session requests we can access the correct provider name.
        // Ex: user.providers[user.currentProvider].name
        user.currentProvider = 'local';

        user.save(function (err) {
          if (err) {
            logger.error('PassportJS LocalStrategy save error: ' + err.toString());
          }
          return done(err, user);
        });

      });
    }
  ));

  passport.use(new GitHubStrategy({

      clientID: config.get('github').clientID,
      clientSecret: config.get('github').clientSecret,
      callbackURL: config.get('github').callbackURL

    },
    function (accessToken, refreshToken, profile, done) {

      var email = profile.emails[0].value;

      var provider = {
        name: profile.displayName,
        username: profile.username,
        profile: profile._json
      };

      User.findOne({email: email}, function (err, user) {

        if (!user) {
          user = new User({
            email: email,
            currentProvider: 'github',
            providers: {}
          });

          user.providers.github = provider;

          user.save(function (err) {
            if (err) {
              logger.error('PassportJS GitHubStrategy save error: ' + err.toString());
            }
            return done(err, user);
          });
        }

        // Social strategy check this provider exists for this email address else append it
        else {

          // An email can have several providers which can have different values for the user's name
          // Update and save the currentProvider property so that when passportjs deserializes
          // in future session requests we can access the correct provider name.
          // Ex: user.providers[user.currentProvider].name
          user.currentProvider = 'github';

          // Create or Update provider data every login as what the profile data sent by github might have changed
          user.providers.github = provider;
          user.markModified('providers');

          user.save(function (err) {
            if (err) {
              logger.error('PassportJS GitHubStrategy save error: ' + err.toString());
            }
            return done(err, user);
          });

        }

      });
    }
  ));

  // Use google strategy
  passport.use(new GoogleStrategy({
      clientID: config.get('google').clientID,
      clientSecret: config.get('google').clientSecret,
      returnURL: config.get('google').callbackURL
    },
    function (identifier, profile, done) {

      var email = profile.emails[0].value;

      var provider = {
        name: [ profile.name.givenName, profile.name.familyName ].join(' '),
        username: profile.displayName
      };

      User.findOne({email: email}, function (err, user) {

        if (!user) {
          user = new User({
            email: email,
            currentProvider: 'google',
            providers: {}
          });

          user.providers.google = provider;

          user.save(function (err) {
            if (err) {
              logger.error('PassportJS GoogleStrategy save error: ' + err.toString());
            }
            return done(err, user);
          });
        }

        // Social strategy check this provider exists for this email address else append it
        else {

          // An email can have several providers which can have different values for the user's name
          // Update and save the currentProvider property so that when passportjs deserializes
          // in future session requests we can access the correct provider name.
          // Ex: user.providers[user.currentProvider].name
          user.currentProvider = 'google';

          // Create or Update provider data every login as what the profile data sent by github might have changed
          user.providers.google = provider;
          user.markModified('providers');

          user.save(function (err) {
            if (err) {
              logger.error('PassportJS GoogleStrategy save error: ' + err.toString());
            }
            return done(err, user);
          });

        }

      });
    }
  ));

};