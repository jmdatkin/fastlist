var createError = require('http-errors');
var express = require('express');
var passport = require('passport');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db_helper = require("./db_helper");

var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");

var app = express();

db_helper.connect();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));


require("./auth");


//Load middleware
// app.configure(function() {
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/register',registerRouter);
app.use('/login', loginRouter);

// });
app.use( bodyParser.urlencoded({ extended : false }) );

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));



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
