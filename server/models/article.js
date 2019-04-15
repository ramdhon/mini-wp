const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: String,
  content: String,
  createdAt: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  featuredImage: String,
})

let Article = mongoose.model('Article', articleSchema);


module.exports = Article;