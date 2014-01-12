var _ = require('lodash');

// If the user is logged in return a user object with limited properties
// If not logged in return null
exports.user = function (req) {
  var user;

  if (req.user) {
    user = _.pick(req.user, 'email', '_id');
    user.name = req.user.providers[req.user.currentProvider].name;
  }
  else {
    user = null;
  }

  return user;
};
