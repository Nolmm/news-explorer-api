const cors = require('cors');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors } = require('celebrate');
const limiter = require('./middlewares/limiter.js');
const { NotFoundError } = require('./errors/not-found-err.js');
const { authCheck, tokenCheck, signupCheck } = require('./middlewares/validation.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');

const { PORT = 3000 } = process.env;

const app = express();

const { userRouter } = require('./routers/users.js');
const { articleRouter } = require('./routers/articles.js');
const { login, createUser } = require('./controllers/users.js');
const handlerErrors = require('./middlewares/handlerErrors.js');
const auth = require('./middlewares/auth.js');

app.use(cors());
app.use(limiter);
mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(requestLogger);
app.use(bodyParser.json());
app.post('/signin', celebrate(authCheck), login);
app.post('/signup', celebrate(signupCheck), createUser);
app.use(helmet());

app.use(celebrate(tokenCheck), auth);

app.use(userRouter);
app.use(articleRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
