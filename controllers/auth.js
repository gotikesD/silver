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
                if(!user) {next(new Error('Not Find'))}

                let compare = bcrypt.compareSync(req.body.password, user.password);

                if(compare) {
                    user.save()
                        .catch((err)=> { next(err)});
                    let token = jwt.sign(user, 'silverSecret');
                    res.json(token)
                } else {
                    next(new Error('Bad password'))
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
                .catch((err)=> { next(err)})
    } ,

    checkUserStatus : (req,res,next) => {
        if(!req.headers.x-access-token) {
            next(new Error('Token not found'))
        } else {
            next()
        }
    },

    checkRules : (req,res,next) => {
       let userId = req.body.userId;
           User.findOne( {_id : userId })
               .then((data) => {
                   if(!data || data.rules === 'Simple User') {
                       next(new Error('Permission denied'))
                   } else {
                       next()
                   }
               })
               .catch((err) => {
                   next(new Error(err))
               })
    },

    adminCheck : (req,res,next) => {
        let userId = req.params.userId;
        User.findOne({_id: userId})
            .then((data) => {
                if (!data || data.rules != 'Admin') {
                    next(new Error('Permission denied'))
                } else {
                    next()
                }
            })
            .catch((err) => {
                next(new Error(err))
            })
    } ,

    checkOwnCar : (req,res,next) => {
        let userId = req.body.userId;
        let stockId = req.body.stockId;
        User.findOne({_id: userId , ownCars : stockId  })
            .then((data) => {
               if(!data) {
                   next(new Error('Permission denied'))
               } else {
                   next()
               }
            })
            .catch((err) => {
                next(new Error(err))
            })
    } ,

    cartRulesCheck : (req,res,next) => {
        let token = req.headers['x-access-token'];

        if(!token) {
            next(new Error('Header x-access-token required'))
        }

        Order.findOne({ _id : req.params.orderId })
              .then((data) => {
                  if(!data) {
                      next(new Error('Not Found'))
                  }
                  else if(data.userId === token) {
                      next()
                  } else {
                      next(new Error('Permission denied'))
                  }
              })
              .catch((err) => {
                next(new Error(err))
              })
    }
};