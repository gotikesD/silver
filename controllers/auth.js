"use strict";
const User = require('../models/user');
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


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
        let current = {};
        let fields = Object.keys(req.body);
        if(req.body.rules === 'Admin') {
            next(new Error('Permission Denied'))
        } else {
            fields.forEach((i) => {
                if(i === 'password') {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(req.body.password, salt);
                    current[i] = hash
                } else {
                    current[i] = req.body[i];
                }
            });
            let user = new User(current);
            user.save()
                .then((user)=> {res.json(user)})
                .catch((err)=> { next(err)})
        }



    } ,


    checkRules : (req,res,next) => {
       let userId = req.body.userId;
       if(!userId || userId.length != 24) {
           next(new Error('Invalid userId'))
       } else {
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
       }
    },

    adminCheck : (req,res,next) => {
        let adminId = req.body.adminId;
        if(!adminId || adminId.length != 24) {
            next(new Error('Invalid userId'))
        } else {
            User.findOne( {_id : adminId })
                .then((data) => {
                    if(data.rules != 'Admin') {
                        next(new Error('Permission denied'))
                    } else {
                        next()
                    }
                })
                .catch((err) => {
                    next(new Error(err))
                })
        }
    }

};