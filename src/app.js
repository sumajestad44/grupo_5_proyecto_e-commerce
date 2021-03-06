const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookies = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors')

const productsApi = require('./routes/api/products')
const usersApi = require('./routes/api/users')


const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');



const app = express();



// middleware de aplicacion


app.use(session({
  secret: 'texto secreto',
  resave: false,
  saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);

app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/products', productsApi);
app.use('/api/users', usersApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
