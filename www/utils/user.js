var _ = require('lodash');

// If the user is logged in return a user object with limited properties
// If not logged in return null
exports.user = function (req) {
  var user;

  if (req.user) {
    user = _.pick(req.user, 'name', 'email', '_id');
  }
  else {
    user = null;
  }

  return user;
};
