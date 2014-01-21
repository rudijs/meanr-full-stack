'use strict';

var config = require('../../../config/config'),
  logger = require(config.get('root') + '/config/log');

// Mongodb and Mongoose setup and configs
require(config.get('root') + '/config/mongodb');

var controller = require(config.get('root') + '/www/controllers/users'),
  should = require('chai').should(),
  assert = require('chai').assert,
  sinon = require('sinon'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');


// Configure Winston logger by using it here, this make the controller log to the test log file.
logger.info('Test Suite Start: usersController - ' + new Date().toString());

describe('<Unit Test>', function () {

  describe('Users Controller', function () {

    it('#authCallback redirects to default route', function (done) {

      // mock expressjs/connect request object
      var req = {};

      // mock expressjs/connect response object
      var res = {};
      res.redirect = function (url) {

        // tests
        should.exist(url);
        url.should.equal('/');

        done();
      };

      // run controller
      controller.authCallback(req, res);

    });

    it('#signin calls redirects to default route', function (done) {

      var req = {};
      var res = {};
      res.redirect = function (url) {

        should.exist(url);
        url.should.equal('/#/signin');

        done();
      };

      // run controller
      controller.signin(req, res);

    });

    it('#signout calls req.logout() and redirect to default route', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.logout = sinon.spy();

      // mock expressjs/connect response object
      var res = {};
      res.redirect = function (url) {

        // tests
        assert(req.logout.calledOnce);

        should.exist(url);
        url.should.equal('/');

        done();
      };

      // run controller
      controller.signout(req, res);

    });

    it('#session redirects to default route', function (done) {

      // mock expressjs/connect request object
      var req = {};

      // mock expressjs/connect response object
      var res = {};
      res.redirect = function (url) {

        // tests
        should.exist(url);
        url.should.equal('/');

        done();
      };

      // run controller
      controller.session(req, res);

    });

    it('#create adds a new user then calls passportjs.login() and redirects to the default route', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.body = {
        name: config.get('testCredentials').name,
        email: config.get('testCredentials').email,
        username: config.get('testCredentials').username,
        password: config.get('testCredentials').password
      };

      // mock passportjs login()
      req.logIn = function (user, callback) {

        // call passportjs callback without error (which means successful login)
        callback();

        // tests
        // passportjs callback should then redirect to the default route
        assert(res.redirect.calledOnce);
        assert(res.redirect.calledWith('/'));

        done();

      };

      // mock expressjs/connect response object
      var res = {};
      res.redirect = sinon.spy();

      // run controller
      controller.create(req, res);


    });

    it('#create handles database validation errors', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.body = {};

      // mock expressjs/connect response object
      var res = {};
      res.redirect = function (url) {

        // tests
        should.exist(url);
        url.should.equal('/#/signup?errors=Please fix these errors:%2C*%20Name%20cannot%20be%20blank%2C*%20Email%20cannot%20be%20blank');

        done();

      };

      // run controller
      controller.create(req, res);

    });

    it('#create handles duplicate email database validation errors', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.body = {
        name: config.get('testCredentials').name,
        email: config.get('testCredentials').email,
        username: config.get('testCredentials').username,
        password: config.get('testCredentials').password
      };

      // mock expressjs/connect response object
      var res = {};
      res.redirect = function (url) {

        // restore User.save for next tests
        User.prototype.save.restore();

        // tests
        should.exist(url);
        url.should.equal('/#/signup?errors=Please fix these errors:%2CThis%20email%20address%20already%20exists');

        done();

      };

      // Simulate database unique index validation error
      var stubSave = function (callback) {
        callback({code: 11000});
      };

      sinon.stub(User.prototype, 'save', stubSave);

      // run controller
      controller.create(req, res);

    });

    it('#create handles req.LogIn errors', function (done) {




      // mock expressjs/connect request object
      var req = {};
      req.body = {
        name: config.get('testCredentials').name,
        email: config.get('testCredentials').email,
        username: config.get('testCredentials').username,
        password: config.get('testCredentials').password
      };
      req.logIn = function (user, callback) {

        callback(new Error('Unable to log user in'), user);

      };

      // mock expressjs/connect response object
      var res = {};
      res.redirect = function (url) {

        // tests
        should.exist(url);
        url.should.equal('/500');

        done();

      };

      // run controller
      controller.create(req, res);

    });

    // Clear out the entire test database
    afterEach(function (done) {
      // reset the database after each test
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].drop();
      }
      done();
    });

  });

});


logger.info('Test Suite End: usersController - ' + new Date().toString());