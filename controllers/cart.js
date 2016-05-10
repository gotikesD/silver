"use strict";
const mongoose = require('mongoose');
const Orders = require('../models/order');
const Cars = require('../models/carsItem');
const User = require('../models/user');

module.exports = {

    addToOrder: (req, res, next) => {

       let userID =  req.body.userId;
       let stockId = req.body.stockId;

        if(!userID || !stockId ) {
            next(new Error('UserId,StockId required'))
        }

        Orders.findOneAndUpdate({
           userId : userID },
           {$push : { items : { stockId : stockId }  }})
            .then((temp) => {
                if(!temp) {
                    let order = new Orders();
                    order.items.push({stockId : stockId });
                    order.userId = userID;
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
    } ,

    deleteFromOrder : (req,res,next) => {

        let orderId =  req.body.orderId;
        let stockId = req.body.stockId;

        if(!orderId || !stockId) {
            next(new Error('OrderID,StockID required'))
        }

        Orders.findOneAndUpdate({
            _id : orderId },
            { $pull : { items :  { stockId :stockId } }})
            .then((temp) => {
                    res.json(temp._id)
            })
            .catch((err) => {
                next(new Error(err))
            })
    },

    changeOrder : (req,res,next) => {

        let orderId =  req.body.orderId;
        let stockId = req.body.stockId;
        let amount = req.body.amount;

        if(!orderId || !stockId || !amount) {
            next(new Error('OrderId, stockId, amount required!'))
        }
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
    },

    viewOrder : (req,res,next) => {

        let orderId = req.params.orderId;
        if(!orderId) {
            next(new Error('OrderID required'))
        } else {
            Orders.findOne({_id : orderId})
                .then((data) => {
                    res.json(data)
                })
                .catch((err) => {
                    next(new Error(err))
                })
        }
    },

    confirmOrder : (req,res,next) => {

        let orderId = req.params.orderId;

        if(!orderId) {
            next(new Error('OrderId required'))
        }
        Orders.findOneAndUpdate({_id : orderId}, {status : 'complete'} , {new : true})
            .then((data) => {
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