const router = require('express').Router();
const { getUserMe } = require('../controllers/users.js');

router.get('/users/me', getUserMe);

module.exports = {
  userRouter: router,
};
