'use strict';

const User = require(`../models/user`);
const Cars = require(`../models/carsItem`);
const Orders = require(`../models/order`);

module.exports = {

  getAllUsers : (req, res, next) => {
    User.find({}, { _id : 1, dateOfBirth : 1, rules : 1, name : 1, email : 1 })
      .then((users) => {
        res.json(users)
      })
      .catch((error) => {
        next(new Error(error))
      })
  },

  userInfo : (req, res, next) => {

    const userId = req.params.userId;

    if (!userId) {
      const error = new Error(`User Id required`);
      error.statusCode = 404;
      next(error);
    }
    User.findOne({ _id : userId }, (error, user) => {
      if (error){
        next(new Error(error))
      }
      if (!user) {
        const newError = new Error(`User not found`);
        newError.statusCode = 404;
        next(newError);
      } else {
        res.json(user)
      }
    })

  },

  viewTopCars : (req, res, next) => {
    const limit = 5;
    Cars.find()
      .sort({ bought : -1 })
      .limit(limit)
      .then((cars) => {
        res.json(cars)
      })
      .catch((error) => {
        next(new Error(error))
      })
  },

  viewTopUsers : (req, res, next) => {
    const limit = 5;
    User.find()
      .sort({ sendOrders : -1 })
      .limit(limit)
      .then((users) => {
        res.json(users)
      })
      .catch((error) => {
        next(new Error(error))
      })
  },

  viewLastWeekOrders : (req, res, next) => {
    Orders.find()
      .then((orders) => {
        Date.prototype.getWeek = function () {
          const weekParam1 = 0;
          const weekParam2 = 1;
          const daysPerWeek = 7;
          const seconds = 86400000;
          const onejan = new Date(this.getFullYear(), weekParam1, weekParam2 );

          return Math.ceil((((this - onejan) / seconds) + onejan.getDay() + weekParam2 ) / daysPerWeek);
        };

        const weekNumber = (new Date()).getWeek();

        const dayNames = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
        const result = [];

        dayNames.forEach((day) => {
          let count = 0;
          const weekCount = 1;
          orders.forEach((order) => {
            if (order.createdAt.getWeek() + weekCount >= weekNumber) {
              if (day === dayNames[order.createdAt.getDay()]) {
                count++
              }
            }
          });
          result.push(`${day}  ${count}`)
        });

        return result;
      })
      .then((resultTotal) => {
        res.json(resultTotal)
      })
      .catch((error) => {
        next(new Error(error))
      })
  }

};