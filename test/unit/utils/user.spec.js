'use strict';

var config = require('../../../config/config'),
  should = require('chai').should(),
  expectjs = require('chai').expect,
  userUtil = require(config.get('root') + '/www/utils/user');

// Using expectjs instead of just expect as jsHint is complaining about Redefinition of 'expect'.

describe('<Unit Test>', function () {

  describe('Utils User', function () {

    it('returns a user object with restricted properties from passportjs req.user', function (done) {

      // mock req.user obejct setup by passportjs has all properties from the mongoose model
      var req = {
        user: {
          email: 'example@email.com',
          currentProvider: 'local',
          _id: 'abc123',
          providers: {
            local: {
              name: 'Net Citizen',
              username: 'netcitizen',
              password: 'xxxxxxxxxxx'
            }
          }
        }
      };

      // #user
      var user = userUtil.user(req);

      // tests
      user.name.should.equal('Net Citizen');
      user.email.should.equal('example@email.com');
      user._id.should.equal('abc123');

      should.not.exist(user.hashed_password);

      done();

    });

    it('returns null if no passortjs req.user properties', function (done) {

      // mock req object with no user properties
      var req = {};

      // #user
      var user = userUtil.user(req);

      // test
      expectjs(user).to.be.null;

      done();
    });

  });

});