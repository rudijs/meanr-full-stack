require('../../../config/mongodb');

var should = require('chai').should(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

//Globals
var user;

describe('<Unit Test>', function () {

  describe('Model User:', function () {

    beforeEach(function (done) {

      // Fixture contains all permitted characters
      // letters, numbers, spaces, hyphens and periods
      user = new User({
        name: 'Mr Magoo',
        email: 'mr@magoo.com',
        username: 'mrmagoo',
        password: 'asdf'
      });
      done();

    });

    describe('Method Save', function () {

      it('should save without problems', function (done) {
        return user.save(function (err) {
          should.not.exist(err);
          done();
        });
      });

      it('#authenticate() returns true for correct password', function (done) {

        // test
        user.authenticate(user.password).should.be.true;

        done();

      });

      it('#authenticate() returns false for incorrect password', function (done) {

        // test
        user.authenticate('1234').should.be.false;

        done();

      });

      it('#encryptPassword return empty string if no password input', function () {

        user.encryptPassword().should.equal('');

      });

    });

    afterEach(function (done) {
      // reset the database after each test
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].drop();
      }
      done();
    });

  });

});
