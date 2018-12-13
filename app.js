var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dotenv = require('dotenv').config();

// PUT and DELETE request handle.
var methodOverride = require('method-override');

const environment = process.env.NODE_ENV; // development | production
var stage = require('./config')[environment];

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var helmet = require('helmet');
var session = require('cookie-session');

var app = express();

// Security.
app.use(helmet());
app.set('trust proxy', 1) // trust first proxy
const expiryDate = new Date(Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(
  session({
	  name: process.env.COOKIE_NAME,
		keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2],
		cookie: { 
      secure: true,
			httpOnly: true,
			domain: process.env.COOKIE_DOMAIN,
			path: process.env.COOKIE_PATH,
			expires: expiryDate
		}
	})
);

// Override with the X-HTTP-Method-Override header in the request.
app.use(methodOverride('X-HTTP-Method-Override'));

// Logs.
var logger = require('morgan');
if (environment !== 'production') {
  app.use(logger('dev'));
}

// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1', usersRouter);

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

app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost: ${stage.port}`);
});
module.exports = app;
