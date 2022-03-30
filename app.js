const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const ordersRouter = require('./routes/orders');
const customersRouter = require('./routes/customers');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



module.exports = app;
