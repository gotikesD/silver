"use strict";
const mongoose = require('mongoose');
const Orders = require('../models/order')

module.exports = {

    addToOrder: (req, res, next) => {

       let userID =  req.body.userID;
       let stockID = req.body.stockID;

        if(!userID || !stockID) {
            next(new Error('OrderID,StockID required'))
        }

        Orders.findOneAndUpdate({
           userId : userID },
           {$push : { items : stockID }})
            .then((temp) => {
                if(!temp) {
                    let order = new Orders();
                    order.items.push(stockID);
                    order.userId = userID;
                    order.save();
                    res.json(order._id)
                } else {
                    res.json(temp._id)
                }

            })
            .catch((err) => {
                next(new Error(err))
            })
    } ,

    viewOrder : (req,res,next) => {

        let orderID = req.params.orderID;
        if(!orderID) {
            next(new Error('OrderID required'))
        }

        Orders.findOne({_id : orderID})
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                next(new Error(err))
            })
    },

    confirmOrder : (req,res,next) => {

        let orderID = req.params.orderID;

        Orders.findOneAndUpdate({_id : orderID}, {status : 'complete'})
            .then((data) => {
                res.end('Status was changed')
            })
            .catch((err) => {
                next(new Error(err))
            })
    }
}