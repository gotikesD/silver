"use strict";
const Joi = require('joi');

module.exports = {

    loginValidation : (req,res,next) => {


        let productJoi = {
            email : Joi.string().required().email(),
            password : Joi.string().required().min(6).max(10)
        };

        Joi.validate({
            email: req.body.email,
            password: req.body.password
        }, productJoi, (err, userInfo) => {
            err ? next(err) : next();
        })
    },

    signValidation : (req,res,next) => {

        if(!req.body.name || !req.body.surName || !req.body.email || !req.body.password ) {
            next(new Error('You miss one of the required fields(name,surName.email,password)'))
        }

        let productJoi = {
            name: Joi.string().required().min(2).max(20),
            surName: Joi.string().required().min(2).max(20),
            email : Joi.string().required().email(),
            password : Joi.string().required().min(6).max(10),
            date : Joi.date().format('YYYY-MM-DD')
        };

        Joi.validate({
            name: req.body.name,
            surName: req.body.surName,
            email: req.body.email,
            password: req.body.password,
            date : req.body.date
        }, productJoi, (err, userInfo) => {
            if(err) {
                err.statusCode = 404;
                next(err)
            } else {
                next();
            }
        })
    }
};