var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  content: {
    type: String,
    trim: true,
    required: true
  }
});

/**
 * Validations
 */

var blankValidator = function (val) {
  if (val && val.length >= 1) {
    return true;
  }
  return false;
};

var lengthValidator = function (val) {
  if (val && val.length >= 3) {
    return true;
  }
  return false;
};

ArticleSchema.path('title').validate(blankValidator, 'cannot be blank');
ArticleSchema.path('title').validate(lengthValidator, 'must be at least 3 characters');

ArticleSchema.path('content').validate(blankValidator, 'cannot be blank');
ArticleSchema.path('content').validate(lengthValidator, 'must be at least 3 characters');

/**
 * Statics
 */

ArticleSchema.statics.load = function (id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);

};

mongoose.model('Article', ArticleSchema);
