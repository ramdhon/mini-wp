const express = require('express');
const articles = express.Router();

const ArticleController = require('../../controllers/article');


articles.get('/', ArticleController.all);
articles.post('/', ArticleController.create);
articles.get('/:id', ArticleController.one);
articles.put('/:id', ArticleController.update);
articles.delete('/:id', ArticleController.delete);


module.exports = articles;