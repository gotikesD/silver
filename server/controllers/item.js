"use strict";
const Cars = require(`../models/carsItem`);
const mongoose = require(`mongoose`);
const Users = require(`../models/user`);
const jwt = require(`jsonwebtoken`);
const JSONStream = require(`JSONStream`);

module.exports = {

  getAll : (req, res, next) => {

    const perPage = req.query.perPage;
    const page = req.query.page;

    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`withCredentials`, true);
    Cars.find({}, { _id : 1, cost : 1, color : 1, model : 1 })
      .skip(+page * +perPage)
      .limit(+perPage)
      .stream()
      .pipe(JSONStream.stringify())
      .pipe(res);

  },

  getAllCount : (req, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, `*`);
    res.setHeader(`withCredentials`, true);
    Cars.count({})
      .then((count) => {
        res.json(count)
      })
      .catch((error) => {
        next(error)
      })
  },

  viewTopCars : (req, res, next) => {

    const sortType = -1;
    const limit = 5;
    Cars.find()
      .sort({ bought : sortType })
      .limit(limit)
      .then((cars) => {
        res.setHeader(`Access-Control-Allow-Origin`, `*`);
        res.setHeader(`withCredentials`, true);
        res.json(cars)
      })
      .catch((error) => {
        next(new Error(error))
      })
  },
  getSingle : (req, res, next) => {
    const queryId = req.params.id;
    Cars.findOne({ _id : queryId })
      .then((cars) => {
        if (!cars) {
          const error = new Error(`Not found`);
          error.statusCode = 404;
          next(error);
        } else {
          res.setHeader(`Access-Control-Allow-Origin`, `*`);
          res.setHeader(`withCredentials`, true);
          res.json(cars)
        }
      })
      .catch((error) => {
        next(error)
      })
  },

  addNew : (req, res, next) => {

    const current = Object.assign({}, req.body);
    const stockId = req.body.stockId;
    const token = jwt.verify(req.headers[`x-access-token`], `silverSecret`);
    const userId = token._doc._id;

    if (!stockId) {
      const error = new Error(`StockId required`);
      error.statusCode = 404;
      next(error);
    } else {
      Users.findOneAndUpdate({
        _id : userId
      },
        { $push : { ownCars : stockId }, rules : `Advanced` }, { new : true })
        .then((user) => {
          if (!user) {
            const error = new Error(`User Not found`);
            error.statusCode = 404;
            next(error);
          } else {
            const car = new Cars(current);
            car.save()
              .then(() => {
                const newToken = jwt.sign(user, `silverSecret`);
                res.json(newToken)
              })
              .catch((error) => next(error))
          }
        })
        .catch((error) => {
          console.log(error)
          next(error)
        });
    }

  },

  deleteCar : (req, res, next) => {

    const stockId = req.body.stockId;

    if (!stockId) {
      const error = new Error(`Stock Id required`);
      error.statusCode = 404;
      next(error);
    } else {
      Cars.remove({ stockId : stockId })
        .then((cars) => {
          if (!cars) {
            const error = new Error(`Cars with this stockId not Found`);
            error.statusCode = 404;
            next(error);
          }
          Users.findOneAndUpdate(
            { ownCars : stockId },
            { $pull : { ownCars : stockId } },
            { new : true }
            )
            .then((user) => {
              console.log(user)
            })
            .catch((error ) => {
              next(error)
            });
          return cars
        })
        .then(() => {
          res.json({ answer : `Deleted from cars DB and user DB` })
        })
        .catch((error) => {
          next(error)
        })
    }

  },

  updateCar : (req, res, next) => {

    const stockId = req.body.stockId;

    if (!stockId) {
      const error = new Error(`Stock Id required!`);
      error.statusCode = 404;
      next(error);
    } else {

      const current = Object.assign({}, req.body);

      Cars.findOneAndUpdate({ stockId : stockId },
        current, { new : true })
        .then((cars) => {
          res.json(cars)
        })
        .catch((error) => {
          next(error)
        })
    }
  },

  viewAllUserCars : (req, res, next) => {
    const token = jwt.verify(req.headers[`x-access-token`], `silverSecret`);
    const userCars = token._doc.ownCars;
    Cars.find({ stockId : { $in : userCars } })
      .then((cars) => {
        res.json(cars)
      })
      .catch((error) => {
        next(error)
      })
  },

  viewSingleUserCar : (req, res, next) => {
    const carId = req.params.carId;

    Cars.findOne({ _id : carId })
      .then((cars) => {
        if (!cars) {
          const error = new Error(`This car is not your`);
          error.statusCode = 404;
          next(error)
        } else {
          res.json(cars)
        }
      })
      .catch((error) => {
        next(error)
      })
  }

};