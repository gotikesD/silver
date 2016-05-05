"use strict";
const Cars = require('../models/carsItem');
const mongoose = require('mongoose');

module.exports = {
    getAll : (req,res,next) => {
        Cars.find({}, {_id : 1, retailPrice: 1, color : 1, model : 1})
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                console.log(err);
                next(new Error(err))
            })
    } ,

    getSingle : (req,res,next) => {
        let queryId = req.params.id;
        Cars.findOne({_id : queryId})
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                next(new Error(err))
            })
    } ,

    addNew : (req,res,next) => {
        res.end('You can do this!')
    }
};