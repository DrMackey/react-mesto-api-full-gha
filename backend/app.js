require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { validateCreateUser, validateLogin } = require('./middlewares/validate');
const { createUser, login } = require('./controllers/users');
const NotFound = require('./errors/notfound');
var cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'http://localhost:3005',
  'http://mesto-drmackey.nomoredomainsrocks.ru',
  'http://api.mesto-drmackey.nomoredomainsrocks.ru',
  'https://mesto-drmackey.nomoredomainsrocks.ru',
  'https://api.mesto-drmackey.nomoredomainsrocks.ru',
];

app.use(cors({ credentials: true, origin: allowedCors, maxAge: 30 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

// app.use(function (req, res, next) {
//   const { origin } = req.headers;

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   next();
// });

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  // res
  //   .status(statusCode)
  //   .send({ message: statusCode === 500 ? 'Что то пошло не так' : message });
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? message : message });
});

app.listen(PORT, console.log('Port:', PORT));
