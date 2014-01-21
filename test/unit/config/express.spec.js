'use strict';

var config = require('../../../config/config'),
  express = require('express'),
  passport = require('passport'),
  request = require('supertest'),
  expectjs = require('chai').expect;


// Expressjs setup
var app = express();

// Expressjs configs
require(config.get('root') + '/config/express')(app, passport);

describe('<Unit Test>', function () {

  describe('Express config', function () {

    it('handles server 500 errors', function (done) {

      // Set the express enviromnet to production so we get the friendly user message
      // and not the development code stack trace
      app.set('env', 'production');

      // Create a route that will throw an exception
      app.get('/errortest', function (req, res, next) {

        return next(new Error('Something blew up!'));
      });

      request(app)
        .get('/errortest')
        .expect(500)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          expectjs(res.text).to.match(/We're\ sorry,\ but\ something\ went\ wrong\.\ We've\ been\ notified\ about\ this\ issue\ and\ we'll\ follow\ up\ on\ this\ right\ away\./);

          done();
        });

    });

    it('handles server 404 errors by 301 permanent redirect to AngularJS', function (done) {

      request(app)
        .get('/articles')
        .expect(301)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          // 301 permanent redirect to angularjs which will handle the 404 page if the route doesn't exist in AngularJS
          expectjs(res.headers.location).to.equal('/#/articles');

          done();
        });

    });

  });

});