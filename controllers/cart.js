"use strict";
const mongoose = require('mongoose');
const Orders = require('../models/order')

module.exports = {

    addToOrder: (req, res, next) => {

       let userID =  req.body.userID;
       let stockID = req.body.stockID;

        if(!userID || !stockID ) {
            next(new Error('OrderID,StockID required'))
        }

        Orders.findOneAndUpdate({
           userId : userID },
           {$push : { items : { stockId : stockID }  }})
            .then((temp) => {
                if(!temp) {
                    let order = new Orders();
                    order.items.push({stockId : stockID });
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
        let stockID = req.body.stockID;

        if(!orderId || !stockID) {
            next(new Error('OrderID,StockID required'))
        }

        Orders.findOneAndUpdate({
            _id : orderId },
            { $pull : { items :  { stockId :stockID } }})
            .then((temp) => {
                    res.json(temp._id)
            })
            .catch((err) => {
                next(new Error(err))
            })
    },

    changeOrder : (req,res,next) => {

        let orderId =  req.body.orderId;
        let stockID = req.body.stockID;
        let amount = req.body.amount;

        if(!orderId || !stockID || !amount) {
            next(new Error('OrderId, stockId, amount required!'))
        }
        Orders.update({
            _id : orderId, 'items.stockId' : stockID },
             {'items.$.amount' : amount}
        )
            .then((answer) => {
                res.json(answer)
            })
            .catch((err) => {
                next(new Error(err))
            })
    },

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