"use strict";
const User = require(`../models/user`);
const sha256 = require(`sha256`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
const Order = require(`../models/order`);


module.exports = {


  loginPost : (req, res, next) => {
    User.findOne({ email : req.body.email })
      .then((user) => {
        if (!user) {
          const error = new Error(`Not Found`);
          error.statusCode = 404;
          next(error)
        } else {
          const compare = bcrypt.compareSync(req.body.password, user.password);
          if (compare) {
            const token = jwt.sign(user, `silverSecret`);
            res.json(token)
          } else {
            const error = new Error(`Bad password`);
            error.statusCode = 404;
            next(error)
          }
        }
      })
      .catch((error) => {
        next(error)
      })
  },

  signPost : (req, res, next) => {
    const fields = Object.assign({}, req.body);
    const saltValue = 10;
    const salt = bcrypt.genSaltSync(saltValue);
    const hash = bcrypt.hashSync(req.body.password, salt);

    fields.password = hash;

    const user = new User(fields);
    user.save()
      .then((updatedUser) => {
        res.json(updatedUser)
      })
      .catch((error) => {
        error.statusCode = 404;
        next(error)
      })
  },

  checkUserStatus : (req, res, next) => {
    if (!req.headers[`x-access-token`]) {
      const error = new Error(`Token not found`);
      error.statusCode = 404;
      next(error);
    } else {
      next()
    }
  },

  checkRules : (req, res, next) => {

    const token = jwt.verify(req.headers[`x-access-token`], `silverSecret`);
    const userId = token._doc._id;

    User.findOne({ _id : userId })
      .then((user) => {
        if (!user || user.rules === `Simple`) {
          const error = new Error(`Permission denied`);
          error.statusCode = 403;
          next(error)
        } else {
          next()
        }
      })
      .catch((error) => {
        next(new Error(error))
      })
  },

  adminCheck : (req, res, next) => {

    const token = jwt.verify(req.headers[`x-access-token`], `silverSecret`);
    const userId = token._doc._id;

    User.findOne({ _id : userId })
      .then((user) => {
        if (!user || user.rules !== `Admin`) {
          const error = new Error(`Permission denied`);
          error.statusCode = 403;
          next(error)
        } else {
          next()
        }
      })
      .catch((error) => {
        next(new Error(error))
      })
  },

  checkOwnCar : (req, res, next) => {
    const token = jwt.verify(req.headers[`x-access-token`], `silverSecret`);
    const userId = token._doc._id;


    const stockId = req.body.stockId;
    User.findOne({ _id : userId })
      .then((user) => {
        if (!user) {
          const error = new Error(`Permission denied, car not Found`);
          error.statusCode = 403;
          next(error)
        } else {
          next()
        }
      })
      .catch((error) => {
        next(new Error(error))
      })
  },

  cartRulesCheck : (req, res, next) => {

    const token = jwt.verify(req.headers[`x-access-token`], `silverSecret`);
    const userId = token._doc._id;
    const order = req.params.orderId || req.params.cartId;
    if (!token) {
      const error = new Error(`Header x-access-token required`);
      error.statusCode = 404;
      next(error);
    } else {
      Order.findOne({ _id : order })
        .then((orderFinded) => {
          if (!orderFinded) {
            const error = new Error(`Not Found`);
            error.statusCode = 404;
            next(error);
          } else if (orderFinded.userId === userId) {
            next()
          } else {
            const error = new Error(`Permission denied`);
            error.statusCode = 403;
            next(error)
          }
        })
        .catch((error) => {
          next(new Error(error))
        })
    }


  }
};