"use strict";
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const cars = require('./routes/cars');
const cart = require('./routes/cart');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(config.database);

mongoose.connection.on('error' , (err)=> {
    console.log(err.message);
    process.exit()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', cars);
app.use('/auth', auth);
app.use('/cart' , cart);


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.send({
            message: err.message,
            status : err.status
        });
    });
}

app.use(function(err, req, res, next) {
    res.send({
        message: err.message,
        status : err.status
    });
});


app.listen(config.port);