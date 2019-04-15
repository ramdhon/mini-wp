const Article = require('../models/article');
const jwt = require('../helpers/jwt');

class Controller {
  static all(req, res) {
    Article.find({})
      .populate('author')
      .then(articles => {
        if (articles.length === 0) {
          res.status(200).json({ message: 'data empty', articles })
        } else {
          res.status(200).json(articles);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }
  
  static create(req, res) {
    console.log(req.file.cloudStoragePublicUrl);
    try {
      let decoded = jwt.verify(req.headers.token);
      Article.create({
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date,
        author: decoded.id,
        featuredImage: req.file.cloudStoragePublicUrl
      })
        .then(newArticle => {
          res.status(201).json({ message: 'successfully created', newArticle });
        })
    }
    catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  
  static one(req, res) {
    Article.findById(req.params.id)
      .populate('author')
      .then(article => {
        if (!article) {
          res.status(200).json({ message: 'data empty', article })
        } else {
          res.status(200).json(article);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }

  static update(req, res) {
    let updatedArticle
    Article.findById(req.params.id)
      .then(article => {
        if (!article) {
          res.status(200).json({ message: 'data not found to update' })
        } else {
          updatedArticle = article;
          updatedArticle.title = req.body.title;
          updatedArticle.content = req.body.content;
          return article.update({
            title: req.body.title,
            contain: req.body.contain,
          })
        }
      })
      .then(info => {
        res.status(200).json({ message: 'successfully updated', updatedArticle, info });
      })  
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }

  static delete(req, res) {
    let deletedArticle = null;
    Article.findById(req.params.id)
      .then(article => {
        if (!article) {
          res.status(200).json({ message: 'data not found to delete' })
        } else {
          deletedArticle = article;
          return article.delete()
        }
      })
      .then(() => {
        res.status(200).json({ message: 'successfully deleted', deletedArticle});
      })  
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }
}


module.exports = Controller;