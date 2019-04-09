const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: String,
  contain: String,
  createdAt: Date
})

let Article = mongoose.model('Article', articleSchema);


module.exports = Article;