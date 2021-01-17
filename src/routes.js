const express = require('express');
const routes = express.Router();

const LetterController = require('./app/controllers/LetterController');
const UserController = require('./app/controllers/UserController');
// const HomeController = require('./app/controllers/HomeController');
const authMiddleware = require('./middlewares/auth');

// routes.get('/', HomeController.index);
routes.post('/sign_in', UserController.signIn);

routes.use(authMiddleware);

routes.get('/letters', LetterController.index);
routes.get('/letters/:id', LetterController.show);
routes.post('/letters', LetterController.post);
routes.put('/letters/:id', LetterController.put);
routes.delete('/letters/:id', LetterController.delete);


module.exports = routes;