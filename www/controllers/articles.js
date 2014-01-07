// Articles JSON only API

// Import required modules
var config = require('../../config/config'),
  logger = require(config.get('root') + '/config/log'),
  q = require('q'),
  _ = require('lodash'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');


// Utility promise object find one Article
var findOneArticle = function (id) {

  var deferred = q.defer();

  Article.load(id, function (err, article) {

    // Error message for:
    // * database error
    // * not found article
    var msg = 'Sorry we are unable to find this article';

    if (err) {
      // @user message
      deferred.reject(msg);

      // @systemsadmin message
      logger.error(err.toString());
      //logger.error(err.stack);
    }
    if (!article) {
      // @user message
      deferred.reject(msg);

      // @systemsadmin message
      logger.error('Unable to find article ' + id);
    }
    else {
      // @user message
      deferred.resolve(article);

      // @systemsadmin message
      logger.info('Found article ' + id);
    }
  });

  return deferred.promise;
};

// Utility promise destroy one Article
var destroyArticle = function (article) {

  var deferred = q.defer();

  article.remove(function (err) {
    if (err) {
      // @systemsadmin message
      logger.error(err.toString());
      // @user message
      deferred.reject('Sorry but we are unable to remove this article, please try again.');

    } else {
      // @systemsadmin message
      logger.info('Destroyed article ' + article._id);

      // @user message
      deferred.resolve();
    }
  });

  return deferred.promise;
};

// List of Articles
exports.all = function (req, res) {
  Article.find().sort('-created_at').exec(function (err, articles) {
    if (err) {
      // @systemsadmin message
      logger.error(err.toString());
      // @user message
      var msg = 'Sorry we have a problem finding all articles';
      logger.error(msg);
      res.jsonp(500, {error: msg});
    } else {
      // @user message
      res.jsonp(articles);
    }
  });
};

//Create a Article
exports.create = function (req, res) {

  // @systemsadmin message
  logger.log('info', 'POST: %j', req.body, {});

  var article = new Article(req.body);

  article.user = req.user;

  article.save(function (err) {
    if (err) {
      // @systemsadmin message
      logger.error(err.toString());

      // @user message
      var errorResponse;

      // respond with model validation errors if they exist or else respond to database errors with generic message
      if (err.errors) {
        errorResponse = err.errors;
      }
      else {
        errorResponse = {error: 'Sorry but we are unable to save this record, please try again.'};
      }

      res.jsonp(400, errorResponse);

    }
    else {
      // @systemsadmin message
      var msg = 'Created article ' + article._id;
      logger.info(msg);
      res.jsonp(201, article);
    }
  });
};

// Show an shareride
exports.show = function (req, res) {

  // Logging is done inside the promise object
  findOneArticle(req.params.articleId)
    .then(
    function (article) {
      res.jsonp(200, article);
    },
    function (err) {
      res.jsonp(200, {error: err});
    }
  )
    .done();

};

// Destroy a shareride
exports.destroy = function (req, res) {

  // @systemadmin logging is done inside the promise object
  // Only the @user error message needs to be logged here
  return findOneArticle(req.params.articleId)
    .then(function (article) {
      return destroyArticle(article);
    })
    .then(
    function () {
      res.send(204);
    },
    function (err) {
      // @user message
      logger.error(err);
      res.jsonp(200, {error: err});
    }
  );

};

// Utility promise save one Ridesahre
var saveArticlePromise = function (article) {

  var deferred = q.defer();

  article.save(function (err) {

    if (err) {

      // @systemsadmin message
      logger.error(err.toString());

      // @user message
      var errorResponse;

      if (err.errors) {
        // respond to model validation errors if they exist
        errorResponse = err.errors;
      }
      else {
        // else respond to database errors with generic message
        errorResponse = {error: 'Sorry but we are unable to save this record, please try again.'};
      }

      // @user message
      deferred.reject(errorResponse);

    } else {

      // @systemsadmin message
      var msg = 'Saved article ' + article._id;
      logger.info(msg);

      // @user message
      deferred.resolve();
    }

  });

  return deferred.promise;
};

// Update a article
exports.update = function (req, res) {

  // @systemsadmin message
  logger.info('PUT: ' + req.params.articleId.toString());
  logger.log('info', 'PUT: %j', req.body, {});

  return findOneArticle(req.params.articleId)
    .then(function (article) {
      article = _.extend(article, req.body);

      return saveArticlePromise(article);
    })
    .then(
    function () {
      res.send(204);
    },
    function (err) {

      // @user message
      logger.error(err);

      res.jsonp(400, err);
    }
  )
    .done();
};
