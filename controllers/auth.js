"use strict";
const User = require('../models/user');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Order = require('../models/order');



module.exports = {


    loginPost : (req,res,next) => {
        User.findOne({email : req.body.email})
            .then((user) => {
                if(!user) {
                    let err = new Error('Not Found');
                    err.statusCode = 404;

                    next(err)
                }
                else {
                    let compare = bcrypt.compareSync(req.body.password, user.password);

                    if(compare) {
                        let token = jwt.sign(user, 'silverSecret');
                        res.json(token)
                    } else {
                        let err = new Error('Bad password');
                        err.statusCode = 404;
                        next(err)
                    }
                }
            })
            .catch((err) => { next(err)})
    },

    signPost : (req,res,next) => {
        let fields = Object.assign({},req.body);

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);

        fields.password = hash;

            let user = new User(fields);
            user.save()
                .then((user)=> {res.json(user)})
                .catch((err)=> {
                    err.statusCode = 404;
                    next(err)
                })
    } ,

    checkUserStatus : (req,res,next) => {
        if(!req.headers['x-access-token']) {
            let err = new Error('Token not found');
            err.statusCode = 404;
            next(err);
        } else {
            next()
        }
    },

    checkRules : (req,res,next) => {

        let token = jwt.verify(req.headers['x-access-token'], 'silverSecret');
        let userId = token._doc._id;

           User.findOne( {_id : userId })
               .then((data) => {
                   if(!data || data.rules === 'Simple User') {
                       let err = new Error('Permission denied');
                       err.statusCode = 403;

                       next(err)
                   } else {
                       next()
                   }
               })
               .catch((err) => {
                   next(new Error(err))
               })
    },

    adminCheck : (req,res,next) => {

        let token = jwt.verify(req.headers['x-access-token'], 'silverSecret');
        let userId = token._doc._id;

        User.findOne({_id: userId})
            .then((data) => {
                if (!data || data.rules != 'Admin') {

                    let err = new Error('Permission denied');
                    err.statusCode = 403;

                    next(err)
                } else {
                    next()
                }
            })
            .catch((err) => {
                next(new Error(err))
            })
    } ,

    checkOwnCar : (req,res,next) => {
        let token = jwt.verify(req.headers['x-access-token'], 'silverSecret');
        let userId = token._doc._id;
        let stockId = req.body.stockId;
        User.findOne({_id: userId , ownCars : stockId  })
            .then((data) => {
               if(!data) {
                   let err = new Error('Permission denied');
                   err.statusCode = 403;

                   next(err)
               } else {
                   next()
               }
            })
            .catch((err) => {
                next(new Error(err))
            })
    } ,

    cartRulesCheck : (req,res,next) => {

        console.log(req.params)
        let token = jwt.verify(req.headers['x-access-token'], 'silverSecret');
        let userId = token._doc._id;
        let order = req.params.orderId || req.params.cartId;
        if(!token) {
            let err = new Error('Header x-access-token required');
            err.statusCode = 404;
            next(err);
        } else {
            Order.findOne({ _id : order })
                .then((data) => {
                    if(!data) {
                        let err = new Error('Not Found');
                        err.statusCode = 404;
                        next(err);
                    }
                    else if(data.userId === userId) {
                        next()
                    } else {
                        let err = new Error('Permission denied');
                        err.statusCode = 403;

                        next(err)
                    }
                })
                .catch((err) => {
                    next(new Error(err))
                })
        }


    }
};