"use strict";
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const cars = require('./routes/cars');
const cart = require('./routes/cart');
const admin = require('./routes/admin');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const statusError  = require('express-status-error');

mongoose.connect(config.database);

mongoose.connection.on('error' , (err)=> {
    console.log(err.message);
    process.exit()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(statusError({debug:true}));

app.use('/', cars);
app.use('/auth', auth);
app.use('/cart' , cart);
app.use('/admin' , admin);


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(Number(err.statusCode) || 500).send({
            message: err.message,
            status : err.status
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        status : err.status
    });
});


app.listen(config.port);