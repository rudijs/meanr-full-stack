'use strict';

module.exports = function (config, app) {

  var articles = require(config.get('root') + '/www/controllers/articles');

  var auth = require(config.get('root') + '/www/middlewares/authorization');

  // URL Parameter Rules

  // article id
  app.param('articleId', /^[0-9a-fA-F]{24}$/);

  // JSON API

  app.get('/api/v1/articles', articles.all);

  app.get('/api/v1/articles/:articleId', articles.show);

  app.post('/api/v1/articles', auth.requiresLogin, articles.create);

  app.put('/api/v1/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);

  app.del('/api/v1/articles/:articleId', articles.destroy);

  // Secure AngularJS templates

  app.get('/articles/create', auth.requiresLogin, function (req, res) {
    res.render('articles/create.html');
  });

  app.get('/articles/edit', auth.requiresLogin, function (req, res) {
    res.render('articles/edit.html');
  });

};
