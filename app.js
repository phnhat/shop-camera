// Khai báo các module cần sử dụng
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');

var restrict = require('./middlewares/restrict');
var database = require('./database/db');
var handleLayout = require('./middlewares/handle-layout')

// Khai báo các Controller
var indexRouter = require('./routes/index');
var signinRouter = require('./routes/signin');
var signupRouter = require('./routes/signup');
var signoutRouter = require('./routes/signout');
var productRouter = require('./routes/product');
var searchRouter = require('./routes/search');
var contactRouter = require('./routes/contact');
var accountRouter = require('./routes/account');
var cartRouter = require('./routes/cart');
var adminRouter = require('./routes/admin/admin');

var app = express();

// Sessions manager
app.use(session({
  key: 'session_cookie_name',
  secret: 'PTUDW2015',
  store: database.sessions.getSessionStore(),
  resave: false,
  saveUninitialized: false
}));

// Cài đặt view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Cài đặt các middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(handleLayout);

// Chuyển tiếp cho các Controller xử lý
app.use('/', indexRouter);
app.get('/home', function (req, res) {
  res.redirect('/');
})
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);
app.use('/product', productRouter);
app.use('/search', searchRouter);
app.use('/contact', contactRouter);
app.use('/account', restrict, accountRouter);
app.use('/cart', restrict, cartRouter);
app.use('/admin', [restrict, function (req, res, next) {
  if (req.session.isAdmin) {
    next();
  } else {
    res.send('Tài khoản của bạn không được cấp quyền để truy cập vào phân vùng này.');
  }
}], adminRouter);

// Bắt lỗi
app.use(function (req, res, next) {
  next(createError(404));
});

// Xử lý lỗi
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;