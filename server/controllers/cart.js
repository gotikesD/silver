"use strict";
const mongoose = require(`mongoose`);
const Orders = require(`../models/order`);
const Cars = require(`../models/carsItem`);
const User = require(`../models/user`);
const jwt = require(`jsonwebtoken`);
const nodemailer = require(`nodemailer`);


module.exports = {

  addToOrder : (req, res, next) => {

    const token = jwt.verify(req.headers[`x-access-token`], `silverSecret`);
    const userId = token._doc._id;


    const stockId = req.body.stockId;
    const orderId = req.body.orderId;

    if (!userId || !stockId) {
      const error = new Error(`UserId,StockId required`);
      error.statusCode = 404;
      next(error);
    } else if (orderId) {
      Orders.findOneAndUpdate({
        orderId : orderId
      },
        { $push : { items : { stockId : stockId } } })
        .then((temp) => {
          if (!temp) {
            const order = new Orders();
            order.items.push({ stockId : stockId });
            order.userId = userId;
            order.save((error) => {
              if (error) {
                next(error)
              }
            });
            res.json(order._id)
          } else {
            res.json(temp._id)
          }

        })
        .catch((error) => {
          next(new Error(error))
        })
    } else {
      Orders.findOneAndUpdate({
        userId : userId
      },
        { $push : { items : { stockId : stockId } } })
        .then((temp) => {
          if (!temp) {
            const order = new Orders();
            order.items.push({ stockId : stockId });
            order.userId = userId;
            order.save((error) => {
              if (error) {
                next(error)
              } else {
                res.json(order._id)
              }
            });
          } else {
            res.json(temp._id)
          }

        })
        .catch((error) => {
          next(new Error(error))
        })
    }
  },

  deleteFromOrder : (req, res, next) => {

    const orderId = req.params.orderId;
    const stockId = req.body.stockId;

    if (!orderId || !stockId) {
      const error = new Error(`OrderId,StockId required`);
      error.statusCode = 404;
      next(error);
    } else {
      Orders.findOneAndUpdate({
        _id : orderId
      },
        { $pull : { items : { stockId : stockId } } })
        .then((temp) => {
          res.json(temp._id)
        })
        .catch((error) => {
          next(error)
        })
    }
  },

  changeOrder : (req, res, next) => {

    const orderId = req.params.orderId;
    const stockId = req.body.stockId;
    const amount = req.body.amount;

    if (!orderId || !stockId || !amount) {
      const error = new Error(`OrderId, stockId, amount required!`);
      error.statusCode = 404;
      next(error);
    } else {
      Orders.findOneAndUpdate({
        _id : orderId, 'items.stockId' : stockId
      },
        { 'items.$.amount' : amount },
        { new : true }
        )
        .then((answer) => {
          res.send(answer._id)
        })
        .catch((error) => {
          next(error)
        })
    }

  },

  viewOrder : (req, res, next) => {


    const cartId = req.params.cartId;
    if (!cartId) {
      const error = new Error(`OrderID required`);
      error.statusCode = 404;
      next(error);
    } else {
      Orders.findOne({ _id : cartId })
        .then((orders) => {
          const carsId = orders.items.map((i) => {
            return i.stockId
          });
          Cars.find({ stockId : { $in : carsId } })
            .then((cars) => {
              const copy = Object.assign({}, orders._doc)
              copy[`carInfo`] = cars;
              return copy
            })
            .then((complete) => {
              res.json(complete)
            })
            .catch((error) => {
              next(error)
            })
        })
        .catch((error) => {
          next(error)
        })
    }
  },

  confirmOrder : (req, res, next) => {

    const cartId = req.params.cartId;
    if (!cartId) {
      const error = new Error(`OrderID required`);
      error.statusCode = 404;
      next(error);
    } else {
      Orders.findOne({ _id : cartId })
        .then((orders) => {
          if (orders.status === `complete`) {
            const error = new Error(`Order Already Completed`);
            error.statusCode = 404;
            next(error);
          } else {
            orders.status = `complete`;
            orders.save();

            if (!orders) {
              const error = new Error(`Order not found`);
              error.statusCode = 404;
              next(error);
            }
            const items = orders.items.map((i) => {
              return i.stockId
            });

            Cars.find({ stockId : { $in : items } })
              .then((cars) => {
                cars.forEach((car) => {
                  const boughtIncriment = 1;
                  car.bought += boughtIncriment;
                  car.save();
                });
              })
              .catch((error) => {
                next(error)
              });
            return orders;
          }
        })
        .then((order) => {
          const userId = order.userId;
          User.findOne({ _id : userId })
            .then((user) => {
              const ordersIncriment = 1;
              user.sendOrders += ordersIncriment;
              user.save();
              return user
            })
            .then((userInfo) => {
              const transporter = nodemailer.createTransport();
              const mailData = {
                from : `silverCars@mail.com`,
                to : userInfo.email,
                subject : `Here is your order`,
                text : `Plaintext version of the message`,
                html : `<div><h2>Hello ' ${userInfo.name}  ${userInfo.surName}  </h2><br/><mark>Hello from silver cars</mark><div>You order Id Is ${order._id} </div></div>`
              };
              transporter.sendMail(mailData, (error) => {
                next(error)
              });
              return order._id
            })
            .then((orderID) => {
              res.json(orderID)
            })
            .catch((error) => {
              next(error)
            })

        })
        .catch((error) => {
          next(error)
        })
    }
  }
}