const Article = require('../models/article');

class Controller {
  static all(req, res) {
    Article.find({})
      .then(articles => {
        if (articles.length === 0) {
          res.status(204).json({ message: 'data empty' })
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
    Article.create({
      title: req.body.title,
      contain: req.body.contain,
      createdAt: new Date
    })
      .then(newArticle => {
        res.status(201).json({ message: 'successfully created', newArticle });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  }
  
  static one(req, res) {
    Article.findById(req.params.id)
      .then(article => {
        if (!article) {
          res.status(204).json({ message: 'data empty' })
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
    Article.findById(req.params.id)
      .then(article => {
        if (!article) {
          res.status(204).json({ message: 'data not found to update' })
        } else {
          return article.update({
            title: req.body.title,
            contain: req.body.contain,
          })
        }
      })
      .then(updatedArticle => {
        res.status(200).json({ message: 'successfully updated', updatedArticle });
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
          res.status(204).json({ message: 'data not found to delete' })
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