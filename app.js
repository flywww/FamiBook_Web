var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport   = require('passport')
var session = require('express-session');
var flash = require('connect-flash');

//routes
var indexRouter = require('./routes/index');
var daybookRouter = require('./routes/daybook');
var userRouter = require('./routes/user');
var daybookApiV1Router = require('./routes/api/v1/daybook');
var userApiV1Router = require('./routes/api/v1/user');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//load passport setting
require('./middlewares/passport-local.js')(passport);
app.use(session({
  secret: 'famibooksecrete',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes
//Web
app.use('/', indexRouter);
app.use('/daybooks', daybookRouter);
app.use('/users', userRouter);
app.use('/api/v1/daybooks', daybookApiV1Router);
app.use('/api/v1/users', userApiV1Router);

//API

//app.use('/routes/authenticate',authenticate);

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
