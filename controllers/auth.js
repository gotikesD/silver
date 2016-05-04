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
                    user.lastLogin = new Date();
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
};