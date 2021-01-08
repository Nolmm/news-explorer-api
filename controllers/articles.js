/* eslint-disable no-shadow */
const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-err.js');
const NotFoundError = require('../errors/not-found-err.js');
const InvalidDataError = require('../errors/invalid-data-err.js');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Не найдено');
      }
      res.status(200).send(data);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(200).send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError('Некорректный запрос'));
      } else {
        next(err);
      }
    });
};
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Статья не найдена');
      }
      if (req.user._id !== article.owner.toString()) {
        throw new ForbiddenError('Недостаточно прав для удаления статьи');
      }
      Article.findByIdAndRemove(req.params.articleId)
        .then((article) => {
          res.send({ data: article });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new NotFoundError('Статья не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
