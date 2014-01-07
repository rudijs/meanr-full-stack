/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {

  if (!req.isAuthenticated()) {
    return res.jsonp(401, {message: 'Not authorized'});
  }
  next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id !== req.user.id) {
      return res.send(401, 'Not authorized');
    }
    next();
  }
};

/**
 * Article authorizations routing middleware
 */
var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

function findOneArticle(articleId, userId, callback) {

  Article.load(articleId, function (err, article) {
    if (err) {
      callback(true, null);
    }
    if (!article) {
      callback(true, null);
    }

    // Compare the two IDs
    if (article.user._id.toString() !== userId) {
      callback(true, null);
    } else {
      callback(null, article);
    }
  });
}

/**
 *
 * @type {{hasAuthorization: Function}}
 */
exports.article = {
  hasAuthorization: function (req, res, next) {

    var articleId = req.params.articleId || req.body.articleId;

    // req.params validate the articleId before getting here
    // req.body does not validate at all so apply a check
    if (articleId === null || typeof articleId === 'undefined' || !articleId.toString().match(/^[0-9a-fA-F]{24}$/)) {
      // req.body.articleId is used in the image upload form which is text/html
      return res.send(401);
    }

    findOneArticle(articleId, req.user.id, function (err) {
      if (err) {
        return res.jsonp(401, {message: 'Not authorized'});
      }
      next();

    });
  }
};