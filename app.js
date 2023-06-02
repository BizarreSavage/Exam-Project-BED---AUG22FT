var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const itemsRouter = require('./routes/items');
const itemRouter = require('./routes/item');
const categoriesRouter = require('./routes/categories');
const categoryRouter = require('./routes/category');
const allcartsRouter = require('./routes/allcarts');
const cartRouter = require('./routes/cart');
const cart_itemsRouter = require('./routes/cart_item');
const ordersRouter = require('./routes/orders');
const allOrdersRouter = require('./routes/allorders');
const orderRouter = require('./routes/order');
const setupRouter = require('./routes/setup');
const searchRouter = require('./routes/search');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/items', itemsRouter);
app.use('/item', itemRouter);
app.use('/categories', categoriesRouter);
app.use('/category', categoryRouter);
app.use('/cart', cartRouter);
app.use('/cart_item', cart_itemsRouter);
app.use('/allcarts', allcartsRouter);
app.use('/orders', ordersRouter);
app.use('/allorders', allOrdersRouter);
app.use('/order', orderRouter);
app.use('/setup', setupRouter);
app.use('/search', searchRouter);

const { sequelize } = require('./models');

sequelize.sync({ alter: true })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch(error => {
    console.error('Unable to sync the models:', error);
  });

module.exports = app;
