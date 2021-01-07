const { Joi, Segments } = require('celebrate');

const authCheck = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
  }),
};

const signupCheck = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
  }),
};

const tokenCheck = {
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().regex(/^Bearer /),
  }).unknown(true),
};

const createArticleCheck = {
  [Segments.BODY]: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().uri().required(),
    image: Joi.string().uri().required(),
  }),
};

const deleteArticleCheck = {
  [Segments.PARAMS]: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24).required(),
  }),
};

// const getUserCheck = {
//   [Segments.PARAMS]: Joi.object().keys({
//     _id: Joi.string().alphanum().length(24).required(),
//   }),
// };

module.exports = {
  authCheck,
  tokenCheck,
  createArticleCheck,
  deleteArticleCheck,
  // getUserCheck,
  signupCheck,
};
