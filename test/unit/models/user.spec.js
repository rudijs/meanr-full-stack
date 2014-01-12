require('../../../config/mongodb');

var should = require('chai').should(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

//Globals
var user;

describe('<Unit Test>', function () {

  describe('Model User:', function () {

    beforeEach(function (done) {

      user = new User({
        email: 'net@citizen',
        currentProvider: 'local',
        providers: {
          local: {
            name: 'Net Citizen',
            username: 'netcitizen',
            password: 'abcdef'
          }
        }
      });

      done();

    });

    describe('Method Save', function () {

      it('should save without problems', function (done) {
        user.save(function (err) {

          // test
          should.not.exist(err);

          done();
        });
      });

      it('#authenticate() returns true for correct password', function (done) {

        var plainPassword = user.providers.local.password;

        user.save(function (err) {

          // test
          should.not.exist(err);
          user.authenticate(plainPassword).should.be.true;

          done();

        });

      });

      it('#authenticate() returns false for incorrect password', function (done) {

        user.save(function (err) {

          // test
          should.not.exist(err);
          user.authenticate('1234').should.be.false;

          done();

        });

      });

      it('should not store plain text password', function (done) {

        var plainPassword = user.providers.local.password;

        user.save(function (err) {

          // test
          should.not.exist(err);
          user.providers.local.password.should.not.equal(plainPassword);

          done();

        });

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
