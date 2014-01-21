'use strict';

require('../../../config/mongodb');

var should = require('chai').should(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article');

//Globals
var article;

describe('<Unit Test>', function () {

  describe('Model Article:', function () {

    beforeEach(function (done) {

      var user = new User({
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

      user.save(function (err) {

        if (err) {
          console.log(err.toString());
        }

        article = new Article({
          title: 'Test Title',
          content: 'Test Content',
          user: user
        });

        done();

      });

    });

    describe('Method Save', function () {

      it('should save an article', function (done) {
        article.save(function (err) {
          should.not.exist(err);
          done();
        });
      });

      it('should find a article', function (done) {
        article.save(function (err, article) {
          should.not.exist(err);
          var articleId = article._id;

          Article.load(articleId, function (err, article) {
            should.not.exist(err);
            article._id.should.eql(articleId);
            done();
          });
        });
      });

      it('should show an error if TITLE is not defined', function (done) {

        article = new Article({
          content: 'Test Content'
        });

        article.save(function (err) {
          should.exist(err);
          done();
        });

      });

      it('should show an error without a TITLE value', function (done) {
        article.title = '';
        article.save(function (err) {
          should.exist(err);
          done();
        });
      });

      it('should show an error if TITLE is too short', function (done) {
        article.title = 'AB';
        article.save(function (err) {
          should.exist(err);
          done();
        });
      });

      it('should show an error if CONTENT is not defined', function (done) {

        article = new Article({
          title: 'Test Title'
        });

        article.save(function (err) {
          should.exist(err);
          done();
        });

      });

      it('should show an error if CONTENT is not defined', function (done) {

        article = new Article({
          title: 'Test Title'
        });

        article.save(function (err) {
          should.exist(err);
          done();
        });

      });

      it('should show an error without a CONTENT value', function (done) {
        article.content = '';
        article.save(function (err) {
          should.exist(err);
          done();
        });
      });

      it('should show an error if CONTENT is too short', function (done) {
        article.content = 'XY';
        article.save(function (err) {
          should.exist(err);
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