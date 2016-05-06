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
       let current = Object.assign({}, req.body);
       let car = new Cars(current);
        car.save()
           .then((data) => res.json(data))
           .catch((err) => next(new Error(err)))
    },

    deleteCar : (req,res,next) => {

        let userId = req.body.userId;
        let stockId = req.body.stockId;
        if(!stockId) {
            next(new Error('Stock Id required!'))
        } else {
            Cars.remove({userId : userId , stockId : stockId})
                .then((data)=> {
                    res.json(data.result)
                })
                .catch((err)=> {
                    next(new Error(err))
                })
        }

    } ,

    updateCar : (req,res,next) => {

        let userId = req.body.userId;
        let stockId = req.body.stockId;
        if(!stockId) {
            next(new Error('Stock Id required!'))
        }  else {

            let current = Object.assign({}, req.body);

            Cars.findOneAndUpdate({userId : userId , stockId : stockId},
                  current, { new : true} )
                .then((data)=> {
                    res.json(data)
                })
                .catch((err)=> {
                    next(new Error(err))
                })
        }
    }

};