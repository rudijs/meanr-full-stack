var config = require('../../../config/config'),
  logger = require(config.get('root') + '/config/log');

// Mongodb and Mongoose setup and configs
require(config.get('root') + '/config/mongodb');

var should = require('chai').should(),
  sinon = require('sinon'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  controller = require(config.get('root') + '/www/controllers/articles'),
  store = {};


// Configure Winston logger by using it here, this make the controller log to the test log file.
logger.info('Test Suite Start: articlesController - ' + new Date().toString());

describe('<Unit Test>', function () {

  describe('Articles Controller', function () {

    beforeEach(function (done) {

      // Create a test database user
      var user = new User({
        email: config.get('testCredentials').email,
        currentProvider: 'local',
        providers: {
          local: {
            name: config.get('testCredentials').name,
            username: config.get('testCredentials').username,
            password: config.get('testCredentials').password
          }
        }
      });

      user.save(function (err) {
        should.not.exist(err);
        store.user = user;
        done();
      });

    });

    beforeEach(function (done) {

      // Create a test database article
      var article = new Article({
        title: 'Test Title',
        content: 'Test Content',
        user: store.user
      });
      article.save(function (err) {
        should.not.exist(err);
        store.articleId = article._id;
        done();
      });

    });

    it('#create() should save to the database, respond with 201 status code and the new mongoose article object', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.user = store.user;
      req.body = {title: 'Test Title', content: 'Test Content'};

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode) {

        // tests
        responseCode.should.equal(201);
        done();
      };

      // run controller
      controller.create(req, res);

    });

    it('#create() handles model validation errors', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.user = store.user;
      req.body = {};

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode, responseObject) {

        // tests
        responseCode.should.equal(400);

        responseObject.title.type.should.equal('required');
        responseObject.content.type.should.equal('required');

        done();
      };

      // run controller
      controller.create(req, res);

    });

    it('#create() handles database errors', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.user = store.user;
      req.body = {title: 'Test Title', content: 'Test Content'};

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode, responseObject) {

        // tests
        responseCode.should.equal(400);

        responseObject.error.should.equal('Sorry but we are unable to save this record, please try again.');

        // restore sinon Article.load for next tests
        Article.prototype.save.restore();

        done();
      };

      // Simulate database driver error. Stub Article.load() to return and error in the callback
      var stubSave = function (callback) {
        callback(new Error('Stubbed article.save()'));
      };

      sinon.stub(Article.prototype, 'save', stubSave);

      // run controller
      controller.create(req, res);

    });

    it('#all() finds all articles', function (done) {

      // mock expressjs/connect request object
      var req = {};

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (articles) {
        articles.length.should.equal(1);
        articles[0].title.should.equal('Test Title');
        done();
      };

      controller.all(req, res);

    });

    it('#all() handles database errors', function (done) {

      // mock expressjs/connect request object
      var req = {};

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode, responseObject) {

        // tests
        responseCode.should.equal(500);

        responseObject.error.should.equal('Sorry we have a problem finding all articles');

        // restore sinon mongoose.Model.find for next tests
        mongoose.Model.find.restore();

        done();
      };

      // Simulate database driver error. Stub mongoose find().sort().exec() to return an error in the callback
      var stubFind = {

        // sort() returns self
        sort: function () {
          return this;
        },

        // exec() callback error
        exec: function (callback) {
          callback(new Error('Stubbed Article.exec()'));
        }
      };

      // stub find() with mock
      sinon.stub(mongoose.Model, 'find').returns(stubFind);

      // run controller
      controller.all(req, res);

    });

    it('#show() finds a single article', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.params = {};
      req.params.articleId = store.articleId;

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode, responseObject) {

        // tests
        responseCode.should.equal(200);
        responseObject.title.should.equal('Test Title');

        done();
      };

      // run controller
      controller.show(req, res);

    });

    it('#show() handles not found article', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.params = {};
      req.params.articleId = '528d994b3b6c9c4350000008';

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode, responseObject) {

        // tests
        responseCode.should.equal(200);

        responseObject.error.should.equal('Sorry we are unable to find this article');

        done();
      };

      // run controller
      controller.show(req, res);

    });

    it('#show() handles database errors', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.params = {};
      req.params.articleId = '528d994b3b6c9c4350000008';

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode, responseObject) {

        // tests
        responseCode.should.equal(200);

        responseObject.error.should.equal('Sorry we are unable to find this article');

        // restore sinon Article.load for next tests
        Article.load.restore();

        done();
      };

      // Simulate database driver error. Stub Article.load() to return and error in the callback
      var stubLoad = function (id, callback) {
        callback(new Error('Stubbed Article.load()'));
      };

      sinon.stub(Article, 'load', stubLoad);

      // run controller
      controller.show(req, res);

    });

    it('#update() updates a article', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.params = {};
      req.params.articleId = store.articleId;
      req.body = {title: 'Test Title 2', content: 'Test Content 2'};

      // mock expressjs/connect response object
      var res = {};
      res.send = function (responseCode) {

        // tests
        responseCode.should.equal(204);

        done();
      };

      // run controller
      controller.update(req, res);

    });

    it('#update() handles unknown article update request errors', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.params = {};
      req.params.articleId = '528d994b3b6c9c4350000008';

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode, responseObject) {

        // tests
        responseCode.should.equal(400);

        responseObject.should.equal('Sorry we are unable to find this article');

        done();
      };

      // run controller
      controller.update(req, res);

    });

    it('#update() handles database errors', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.params = {};
      req.params.articleId = store.articleId;
      req.body = {title: 'Test Title 2', content: 'Test Content 2'};

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode, responseObject) {

        // tests
        responseCode.should.equal(400);

        responseObject.error.should.equal('Sorry but we are unable to save this record, please try again.');

        // restore sinon Article.load for next tests
        Article.prototype.save.restore();

        done();
      };

      // Simulate database driver error. Stub article.save() to return and error in the callback
      var stubSave = function (callback) {
        callback(new Error('Stubbed article.save()'));
      };

      sinon.stub(Article.prototype, 'save', stubSave);

      // run controller
      controller.update(req, res);

    });

    it('#update() handles validation errors', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.params = {};
      req.params.articleId = store.articleId;
      req.body = {title: 'AB', content: 'DE'};

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode, responseObject) {

        // tests
        responseCode.should.equal(400);

        responseObject.title.path.should.equal('title');
        responseObject.title.message.should.equal('must be at least 3 characters');

        responseObject.content.path.should.equal('content');
        responseObject.content.message.should.equal('must be at least 3 characters');

        done();
      };

      // run controller
      controller.update(req, res);

    });

    it('#destroy() deletes a article', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.params = {};
      req.params.articleId = store.articleId;

      // mock expressjs/connect response object
      var res = {};
      res.send = function (responseCode) {

        // tests
        responseCode.should.equal(204);

        done();
      };

      // run controller
      controller.destroy(req, res);

    });

    it('#destroy() handles model validation errors', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.params = {};
      req.params.articleId = store.articleId;

      // mock expressjs/connect response object
      var res = {};
      res.jsonp = function (responseCode, responseObject) {

        // tests
        responseCode.should.equal(200);

        responseObject.error.should.equal('Sorry but we are unable to remove this article, please try again.');

        // restore sinon Article.remove for next tests
        Article.prototype.remove.restore();

        done();
      };

      // Simulate database driver error. Stub article.remove() to return and error in the callback
      var stubRemove = function (callback) {
        callback(new Error('Stubbed article.remove()'));
      };

      sinon.stub(Article.prototype, 'remove', stubRemove);

      // run controller
      controller.destroy(req, res);

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

logger.info('Test Suite End: articlesController - ' + new Date().toString());