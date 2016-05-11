"use strict";
const Cars = require('../models/carsItem');
const mongoose = require('mongoose');
const Users = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports = {
    getAll : (req,res,next) => {
        Cars.find({}, {_id : 1, retailPrice: 1, color : 1, model : 1})
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {

                next(new Error(err))
            })
    } ,

    getSingle : (req,res,next) => {
        let queryId = req.params.id;
        Cars.findOne({_id : queryId})
            .then((data) => {
                if(!data) {
                    let err = new Error('Not found');
                    err.statusCode = 404;
                    next(err);
                } else {
                    res.json(data)
                }
            })
            .catch((err) => {
                next(new Error(err))
            })
    } ,

    addNew : (req,res,next) => {

       let current = Object.assign({}, req.body);
       let stockId = req.body.stockId;
       let token = jwt.verify(req.headers['x-access-token'], 'silverSecret');
       let userId = token._doc._id;

        if(!stockId) {
            let err = new Error('StockId required');
            err.statusCode = 404;
            next(err);
        } else {
            Users.findOneAndUpdate({
                    _id : userId } ,
                {$push : { ownCars : stockId } , rules : 'Advanced'})
                .then((data) => {
                    if(!data) {
                        let err = new Error('User Not found');
                        err.statusCode = 404;
                        next(err);
                    } else{
                        let car = new Cars(current);
                        car.save()
                            .then((cur) => res.json(cur))
                            .catch((err) => next(new Error(err)));
                    }
                })
                .catch((err) => {
                    next(new Error(err))
                });
        }

    },

    deleteCar : (req,res,next) => {

        let stockId = req.body.stockId;

        if(!stockId) {
            let err = new Error('Stock Id required');
            err.statusCode = 404;
            next(err);
        } else {
            Cars.remove({ stockId : stockId})
                .then((data)=> {
                    if(!data) {
                        let err = new Error('Cars with this stockId not Found');
                        err.statusCode = 404;
                        next(err);
                    }
                    Users.findOneAndUpdate(
                        { ownCars : stockId },
                        {$pull : { ownCars : stockId}},
                        {new : true}
                        )
                         .then((data) => {
                             console.log(data)
                         })
                        .catch((err)=> {
                            next(new Error(err))
                        });
                    return data
                })
                .then(()=> {
                    res.end('Deleted from cars DB and user DB')
                })
                .catch((err)=> {
                    next(new Error(err))
                })
        }

    } ,

    updateCar : (req,res,next) => {

        let stockId = req.body.stockId;

        if(!stockId) {
            let err = new Error('Stock Id required!');
            err.statusCode = 404;
            next(err);
        }  else {

            let current = Object.assign({}, req.body);

            Cars.findOneAndUpdate({ stockId : stockId},
                  current, { new : true} )
                .then((data)=> {
                    console.log(data)
                    res.json(data)
                })
                .catch((err)=> {
                    next(new Error(err))
                })
        }
    } ,

    viewAllUserCars : (req,res,next) => {
        let token = jwt.verify(req.headers['x-access-token'], 'silverSecret');
        let userCars = token._doc.ownCars;
        Cars.find({stockId:  { $in : userCars} })
            .then((data) => {
                res.json(data)
            })
            .catch((err)=> {
                next(new Error(err))
            })
    },

    viewSingleUserCar : (req,res,next) => {
        let carId = req.params.carId;

        Cars.findOne({_id: carId })
            .then((data) => {
                res.json(data)
            })
            .catch((err)=> {
                next(new Error(err))
            })
    }

};