var config = require('../../../config/config'),
  logger = require(config.get('root') + '/config/log');

// Mongodb and Mongoose setup and configs
require(config.get('root') + '/config/mongodb');

var controller = require(config.get('root') + '/www/controllers/users'),
  should = require('chai').should(),
  assert = require('chai').assert,
  sinon = require('sinon'),
  mongoose = require('mongoose');
//User = mongoose.model('User');


// Configure Winston logger by using it here, this make the controller log to the test log file.
logger.info('Test Suite Start: usersController - ' + new Date().toString());

describe('<Unit Test>', function () {

  describe('Users Controller', function () {

    it('#authCallback() redirects to default route', function (done) {

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

    it('#signout() calls req.logout() and redirect to default route', function (done) {

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

    it('#session() redirects to default route', function (done) {

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

    it('#create() adds a new user then calls passportjs.login() and redirects to the default route', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.body = {
        name: 'Mr Magoo',
        email: 'mr@magoo.com',
        username: 'mrmagoo',
        password: 'asdf'
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

    it('#create() handles database validation errors', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.body = {};

      // mock expressjs/connect response object
      var res = {};
      res.render = function (path, templateVars) {

        should.exist(path);
        path.should.equal('/#/signup');

        should.exist(templateVars);
        templateVars.errors.should.equal('Invalid password');

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