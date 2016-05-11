"use strict";
const mongoose = require('mongoose');
const Orders = require('../models/order');
const Cars = require('../models/carsItem');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {

    addToOrder: (req, res, next) => {

       let token = jwt.verify(req.headers['x-access-token'], 'silverSecret');
       let userId = token._doc._id;

       let stockId = req.body.stockId;

        if( !userId || !stockId ) {
            let err = new Error('UserId,StockId required');
            err.statusCode = 404;
            next(err);
        } else {
            Orders.findOneAndUpdate({
                    userId : userId },
                {$push : { items : { stockId : stockId }  }})
                .then((temp) => {
                    if(!temp) {
                        let order = new Orders();
                        order.items.push({stockId : stockId });
                        order.userId = userId;
                        order.save( (err)=> {
                            if(err) next(new Error(err))
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
                    next(new Error(err))
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
            Orders.update({
                    _id : orderId, 'items.stockId' : stockId },
                {'items.$.amount' : amount}
                )
                .then((answer) => {
                    res.send('Modifed ' + answer.nModified +' items')
                })
                .catch((err) => {
                    next(new Error(err))
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
                    res.json(data)
                })
                .catch((err) => {
                    next(new Error(err))
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
            Orders.findOneAndUpdate({_id : cartId}, {status : 'complete'} , {new : true})
                .then((data) => {
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
                            next(new Error(err))
                        });
                    return data;
                })
                .then((order) => {
                    let userId = order.userId;
                    User.findOne( {_id :userId })
                        .then((user) => {
                            user.sendOrders += 1;
                            user.save();
                            res.json(order._id)
                        })
                        .catch((err) => {
                            next(new Error(err))
                        })

                })
                .catch((err) => {
                    next(new Error(err))
                })
        }
    }
}