var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//declare router for "student" (1)
var studentRouter = require('./routes/student');
var moduleRouter = require('./routes/module');

var app = express();
//import body-parser library (to get input from client)
var bodyParser = require('body-parser');
//config body parser library
app.use(bodyParser.urlencoded({ extended : false}))
//import mongoose library
var mongoose = require('mongoose');
//config database connection + database name
var database ="mongodb+srv://nammtgch210927:mautiennam2003@cluster0.9ztbaqf.mongodb.net/greenwichdb";
//connect to database
mongoose.connect(database)
  .then(() => console.log("Connect to db success"))
  .catch ((err) => console.error("Connect to db failed" + err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//declare router for "student" (2)
app.use('/student', studentRouter);
app.use('/module', moduleRouter);

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