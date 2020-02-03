// require
require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
// dotenv
const { SERVER_PORT, SESSION_SECRET, DB_STRING } = process.env;

// controller
const { register, login, logout, getCustomer, changePassword } = require('./controller/authController');
const { getStore, getMenus, getDishes, getStripePublicKey, orderDishes, getOrder, deleteOrder, getOrders } = require('./controller/customerController');

// middleware
const { verifyCustomer } = require('./middleware/auth');
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.use(express.static(`${__dirname}/../build`));

// database
massive(DB_STRING).then(db => {
    app.set('db', db);
    console.log('DB is connected!');
})

// endpoints
// auth
app.post('/auth/register', register);
app.post('/auth/login', login);
app.post('/auth/logout', verifyCustomer, logout);
app.get('/auth/customer', verifyCustomer, getCustomer);
app.put('/auth/changepassword', verifyCustomer, changePassword);

// customers
app.get('/api/customer/store', getStore);
app.get('/api/customer/store/:store_id', getMenus);
app.get('/api/customer/menu/:menu_id', getDishes);
app.get('/api/customer/stripe', getStripePublicKey);
app.post('/api/customer/order', verifyCustomer, orderDishes);
app.get('/api/customer/order/:order_id', verifyCustomer, getOrder);
app.delete('/api/customer/order/:order_id', verifyCustomer, deleteOrder);
app.get('/api/customer/order', verifyCustomer, getOrders);


// listen
app.listen(SERVER_PORT, console.log('Server is listening to port', SERVER_PORT));