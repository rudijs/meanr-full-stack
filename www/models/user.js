/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  scrypt = require('scrypt');

/**
 * User Schema
 */
var UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  currentProvider: String,
  providers: Schema.Types.Mixed
},
  { autoIndex: false });

/**
 * Virtuals
 */
UserSchema.virtual('password')
  .get(function () {
    return this.providers.local.password;
  })
  .set(function (password) {
    this.providers.local.password = this.encryptPassword(password);
  });

/**
 * Validations
 */

//var validatePresenceOf = function (value) {
//  return value && value.length;
//};

var blankValidator = function (value) {
  if (value && value.length >= 1) {
    return true;
  }
  return false;
};

var passwordValidator = function (value) {
  if (value && value.length >= 6 && value.length <= 12) {
    return true;
  }
  return false;
};

UserSchema.path('email').validate(function (email) {

  // If using a social login oauth strategy, don't validate
  if (this.currentProvider !== 'local') { return true; }

  if (!blankValidator(email)) { return false; }

}, 'Email cannot be blank');

//UserSchema.path('providers').validate(function (providers) {
//
//  // If using a social login oauth strategy, don't validate
//  if (this.currentProvider !== 'local') { return true; }
//
//  if (!blankValidator(providers.local.name)) { return false; }
//
//}, 'Name cannot be blank');
//
//UserSchema.path('providers').validate(function (providers) {
//
//  // If using a social login oauth strategy, don't validate
//  if (this.currentProvider !== 'local') { return true; }
//
//  if (!blankValidator(providers.local.username)) { return false; }
//
//}, 'Username cannot be blank');
//
//UserSchema.path('providers').validate(function (providers) {
//
//  // If using a social login oauth strategy, don't validate
//  if (this.currentProvider !== 'local') { return true; }
//
//  // Only validate on new records, exiting passwords will be hashed and longer than 12 characters.
//  if (!this.isNew) {
//    return true;
//  }
//
//  if (!passwordValidator(providers.local.password)) { return false; }
//
//}, 'Password must be 6-12 characters');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
  if (!this.isNew) {
    return next();
  }

  if (this.currentProvider === 'local') {
    this.password = this.providers.local.password;
    next();
  }
  else {
    next();
  }

});


/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function (plainText) {
//    return scrypt.verifyHashSync(this.hashedPassword, plainText);
    return scrypt.verifyHashSync(this.password, plainText);
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function (password) {
    if (!password) {
      return '';
    }
    var maxtime = 0.1;
    return scrypt.passwordHashSync(password, maxtime);
  }
};

mongoose.model('User', UserSchema);
