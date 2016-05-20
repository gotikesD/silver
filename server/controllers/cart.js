"use strict";
const mongoose = require('mongoose');
const Orders = require('../models/order');
const Cars = require('../models/carsItem');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


module.exports = {

    addToOrder: (req, res, next) => {

       let token = jwt.verify(req.headers['x-access-token'], 'silverSecret');
       let userId = token._doc._id;


       let stockId = req.body.stockId;
       let orderId = req.body.orderId;

        if( !userId || !stockId ) {
            let err = new Error('UserId,StockId required');
            err.statusCode = 404;
            next(err);
        } else if(orderId) {
            Orders.findOneAndUpdate({
                    orderId : orderId },
                {$push : { items : { stockId : stockId }  }})
                .then((temp) => {
                    if(!temp) {
                        let order = new Orders();
                        order.items.push({stockId : stockId });
                        order.userId = userId;
                        order.save( (err)=> {
                            if(err) next(err)
                        });
                        res.json(order._id)
                    } else {
                        res.json(temp._id)
                    }

                })
                .catch((err) => {
                    next(new Error(err))
                })
        }
        else {
            Orders.findOneAndUpdate({
                    userId : userId },
                {$push : { items : { stockId : stockId }  }})
                .then((temp) => {
                    if(!temp) {
                        let order = new Orders();
                        order.items.push({stockId : stockId });
                        order.userId = userId;
                        order.save( (err)=> {
                            if(err) next(err)
                            else  {
                                res.json(order._id)
                            }
                        });
                    } else {
                        res.json(temp._id)
                    }

                })
                .catch((err) => {
                    next(new Error(err))
                })
        }
    } ,

    deleteFromOrder : (req,res,next) => {

        let orderId =  req.params.orderId;
        let stockId = req.body.stockId;

        if(!orderId || !stockId) {
            let err = new Error('OrderId,StockId required');
            err.statusCode = 404;
            next(err);
        } else {
            Orders.findOneAndUpdate({
                    _id : orderId },
                { $pull : { items :  { stockId :stockId } }})
                .then((temp) => {
                    res.json(temp._id)
                })
                .catch((err) => {
                    next(err)
                })
        }
    },

    changeOrder : (req,res,next) => {

        let orderId =  req.params.orderId;
        let stockId = req.body.stockId;
        let amount = req.body.amount;

        if(!orderId || !stockId || !amount) {
            let err = new Error('OrderId, stockId, amount required!');
            err.statusCode = 404;
            next(err);
        } else {
            Orders.findOneAndUpdate({
                    _id : orderId, 'items.stockId' : stockId },
                {'items.$.amount' : amount},
                {new : true}
                )
                .then((answer) => {
                    res.send(answer._id)
                })
                .catch((err) => {
                    next(err)
                })
        }

    },

    viewOrder : (req,res,next) => {


        let cartId = req.params.cartId;
        if(!cartId) {
            let err = new Error('OrderID required');
            err.statusCode = 404;
            next(err);
        } else {
            Orders.findOne({_id : cartId})
                .then((data) => {
                    let carsId = data.items.map((i) => {
                        return i.stockId
                    });
                    Cars.find({stockId : {$in: carsId } })
                        .then((cars)=> {
                            let copy = Object.assign({}, data._doc)
                           copy['carInfo'] = cars;
                           return copy
                        })
                        .then((complete) => {
                          res.json(complete)
                        })
                        .catch((err) => {
                            next(err)
                        })
                })
                .catch((err) => {
                    next(err)
                })
        }
    },

    confirmOrder : (req,res,next) => {

        let cartId = req.params.cartId;
        if(!cartId) {
            let err = new Error('OrderID required');
            err.statusCode = 404;
            next(err);
        } else {
            Orders.findOne({_id : cartId} )
                .then((data) => {
                    if(data.status === 'complete') {
                        let err = new Error('Order Already Completed');
                        err.statusCode = 404;
                        next(err);
                    } else {

                    data.status = 'complete';
                    data.save();

                    if(!data) {
                        let err = new Error('Order not found');
                        err.statusCode = 404;
                        next(err);
                    }
                    let items =  data.items.map((i) => {
                        return i.stockId
                    });

                    Cars.find({stockId:  { $in : items} })
                        .then((cars)=> {
                            cars.forEach(function(car) {
                                car.bought += 1 ;
                                car.save();
                            });
                        })
                        .catch((err) => {
                            next(err)
                        });
                    return data;
                    }
                })
                .then((order) => {
                    let userId = order.userId;
                    User.findOne( {_id :userId })
                        .then((user) => {
                            user.sendOrders += 1;
                            user.save();
                            return user
                        })
                        .then((userInfo) => {
                            let transporter = nodemailer.createTransport();
                            var mailData = {
                                from: 'silverCars@mail.com',
                                to: userInfo.email,
                                subject: 'Here is your order',
                                text: 'Plaintext version of the message',
                                html: '<div><h2>Hello ' + userInfo.name + ' ' + userInfo.surName +'</h2><br/>' +
                                      '<mark>Hello from silver cars</mark>'+'<div>'+ 'You order Id Is' + order._id +'</div></div>'
                            };
                            transporter.sendMail(mailData, (err) => {
                                next(err)
                            });
                            return order._id
                        })
                        .then((orderID) => {
                            res.json(orderID)
                        })
                        .catch((err) => {
                            next(err)
                        })

                })
                .catch((err) => {
                    next(err)
                })
        }
    }
}