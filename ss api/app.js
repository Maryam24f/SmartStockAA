var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./app-server/routes/index'); 
var usersRouter = require('./app-server/routes/users');
var assetRouter = require('./app-server/routes/asset');
var branchrouter = require('./app-server/routes/branch');
var authRoutes = require('./app-server/routes/auth');
var bodyParser= require('body-parser');
const mongoose = require('mongoose');

var app = express();

// Use the new URL parser and the unified topology option
// Connect to MongoDB
const url = 'mongodb://localhost:27017/IMS';
(async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
})();
// view engine setup
app.set('views', path.join(__dirname,'app-server','views'));
app.set('view engine', 'jade');
const setCacheHeaders = (req, res, next) => {
  console.log('setCacheHeaders middleware called');
  res.setHeader('Cache-Control', 'no-store');
  next();
};

// Apply the middleware globally or to specific routes
app.use(setCacheHeaders); // Apply globally
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assets', assetRouter); // Use '/assets' as the base path for asset routes
app.use('/branches', branchrouter);
app.use('/auth', authRoutes);



app.use(function(req, res, next) {
  console.log('Request URL:', req.originalUrl); // Log the requested URL
  console.error('404 Error: Not Found');
  next(createError(404));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.error('Error:', err);  // Log the error
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
