const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { createArticleCheck, deleteArticleCheck } = require('../middlewares/validation.js');

router.get('/articles', getArticles);
router.post('/articles', celebrate(createArticleCheck), createArticle);
router.delete('/articles/:articleId', celebrate(deleteArticleCheck), deleteArticle);

module.exports = {
  articleRouter: router,
};
