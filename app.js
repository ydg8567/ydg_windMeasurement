const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const windBarChartRouter = require('./routes/service/windBarChart');
const realtimeWindDataRouter = require('./routes/service/realtimeWindData');
const windDetailRouter = require('./routes/service/windDetail');
const deviceManageRouter = require('./routes/service/deviceManage');
const deviceRegisterRouter = require('./routes/service/deviceRegister');
const deviceUpdateRouter = require('./routes/service/deviceUpdate');

const app = express();
const config = require('./config.json')[app.get('env')];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('config', config);

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/index', indexRouter);
app.use('/windBarChart', windBarChartRouter);
app.use('/realtimeWindData', realtimeWindDataRouter);
app.use('/windDetail', windDetailRouter);
app.use('/deviceManage', deviceManageRouter);
app.use('/deviceRegister', deviceRegisterRouter);
app.use('/deviceUpdate', deviceUpdateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
