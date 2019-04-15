const express = require('express');
const articles = express.Router();

const ArticleController = require('../../controllers/article');
const upload = require('../../helpers/upload');
const authentication = require('../../middlewares/authentication');


articles.get('/', ArticleController.all);
articles.post('/', authentication, upload.multer.single('image'), upload.sendUploadToGCS, ArticleController.create);
articles.get('/:id', authentication, ArticleController.one);
articles.put('/:id', authentication, upload.multer.single('image'), upload.sendUploadToGCS, ArticleController.update);
articles.delete('/:id', authentication, ArticleController.delete);


module.exports = articles;