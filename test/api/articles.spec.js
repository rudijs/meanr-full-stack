'use strict';

var config = require('../../config/config'),
  logger = require(config.get('root') + '/config/log'),
  request = require('supertest'),
  assert = require('assert');

console.log('http://' + config.get('app').domain + ':' + config.get('port'));

var apiRequest = request('http://' + config.get('app').domain + ':' + config.get('port'));

// The first test makes a public request to get a cookie/session and csrf key value.
// These credentials are kept in the store object for use in each following request
var store = {};

logger.info('Test Suite Start: articles API V1 - ' + new Date().toString());

describe('Unauthorized requests', function () {

  describe('POST /api/v1/articles', function () {
    it('rejects unauthorized post', function (done) {
      apiRequest
        .post('/api/v1/articles')
        .set('Accept', 'application/json')
        .send({})
        .expect('Content-Type', /json/)
        .expect(403)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          assert.equal(res.body.error, 'Forbidden');
          done();
        });
    });
  });

  describe('PUT /api/v1/articles/:articleId', function () {
    it('rejects unauthorized put', function (done) {
      apiRequest
        .put('/api/v1/articles')
        .set('Accept', 'application/json')
        .send({})
        .expect('Content-Type', /json/)
        .expect(403)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          assert.equal(res.body.error, 'Forbidden');
          done();
        });
    });
  });

  describe('DELETE /api/v1/articles/:articleId', function () {
    it('rejects unauthorized delete', function (done) {
      apiRequest
        .del('/api/v1/articles/526355f6edd19a9a43000016')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          assert.equal(res.body.error, 'Forbidden');
          done();
        });
    });
  });

});

describe('Authorized requests', function () {

  describe('GET /api/v1/articles', function () {
    it('respond with json', function (done) {
      apiRequest
        .get('/api/v1/articles')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          // Set up session
          var csrfParts = res.headers['set-cookie'][0].split(';')[0].split('=');
          store.csrfKey = 'X-' + csrfParts[0];
          store.csrfVal = decodeURIComponent(csrfParts[1]);

          var srsVal = res.headers['set-cookie'][1].split(';')[0];
          store.srsVal = decodeURIComponent(srsVal);

          done();
        });
    });
  });

  describe('POST /users/session', function () {

    it('logs in user', function (done) {
      apiRequest
        .post('/users/session')
        .send({
          email: config.get('apiTest').email,
          password: config.get('apiTest').password,
          _csrf: store.csrfVal
        })
        //.set('Accept', 'text/html')
        .set('Cookie', store.srsVal)
        .expect(302)
        .end(function (err) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('POST /api/v1/articles', function () {
    it('rejects missing post data', function (done) {
      apiRequest
        .post('/api/v1/articles')
        .set('Cookie', store.srsVal)
        .set(store.csrfKey, store.csrfVal)
        .set('Accept', 'application/json')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          assert.equal(res.body.title.type, 'required');
          assert.equal(res.body.content.type, 'required');

          done();
        });
    });
  });

  describe('POST /api/v1/articles', function () {
    it('creates a new article', function (done) {
      apiRequest
        .post('/api/v1/articles')
        .set('Cookie', store.srsVal)
        .set(store.csrfKey, store.csrfVal)
        .send({title: 'API Test Title', content: 'API Test Content'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function (err) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /api/v1/articles', function () {
    it('respond with json', function (done) {
      apiRequest
        .get('/api/v1/articles')
        .set('Cookie', store.srsVal)
        .set(store.csrfKey, store.csrfVal)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          store.articleId = res.body[0]._id;
          done();
        });
    });
  });

  describe('GET /api/v1/articles/:articleId', function () {
    it('responds with a single json article', function (done) {
      apiRequest
        .get('/api/v1/articles/' + store.articleId)
        .set('Cookie', store.srsVal)
        .set(store.csrfKey, store.csrfVal)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          assert(res.body._id, store.articleId);
          assert.equal(res.body.title, 'API Test Title');
          done();
        });
    });
  });

  describe('PUT /api/v1/articles/:articleId', function () {
    it('updates a article', function (done) {

      apiRequest

        .put('/api/v1/articles/' + store.articleId)
        .set('Cookie', store.srsVal)
        .set(store.csrfKey, store.csrfVal)
        .set('Accept', 'application/json')
        .send({title: 'API Test Title 2', content: 'API Test Content 2'})
        .expect(204)
        .end(function (err) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /api/v1/articles/:articleId', function () {
    it('respond with a single json article', function (done) {
      apiRequest
        .get('/api/v1/articles/' + store.articleId)
        .set('Cookie', store.srsVal)
        .set(store.csrfKey, store.csrfVal)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          assert(res.body._id, store.articleId);
          assert.equal(res.body.title, 'API Test Title 2');
          done();
        });
    });
  });

  describe('DELETE /api/v1/articles/:articleId', function () {
    it('deletes a single article', function (done) {
      apiRequest
        .del('/api/v1/articles/' + store.articleId)
        .set('Cookie', store.srsVal)
        .set(store.csrfKey, store.csrfVal)
        .set('Accept', 'application/json')
        .expect(204)
        .end(function (err) {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /api/v1/articles/:articleId', function () {
    it('respond with a not found article message', function (done) {
      apiRequest
        .get('/api/v1/articles/' + store.articleId)
        .set('Cookie', store.srsVal)
        .set(store.csrfKey, store.csrfVal)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          assert.equal(res.body.error, 'Sorry we are unable to find this article');
          done();
        });
    });
  });

});

logger.info('Test Suite End: articles API V1 - ' + new Date().toString());