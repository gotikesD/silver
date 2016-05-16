"use strict";
const express = require('express');
const router = express.Router();
const controller = require('./auth');
const validation = require('./validation');

router.post('/login',validation.loginValidation, controller.loginPost);

router.post('/sign',validation.signValidation,controller.signPost);


module.exports = router;


/**
 * @api {post} /auth/login/  Request for logging in
 * @apiName login
 * @apiGroup auth
 *
 * @apiParam  {Required} email Send it in the body of the request. Field name - email
 * @apiParam  {Required} password Send it in the body of the request. Field name - password
 *
 * @apiSuccess String  Returns token
 *
 * @apiSuccessExample Success-Response:
 *  "asfsdkpkpo23k4p23okfpsdock23po4k23opk2fopk423pokvp212234"
 *
 * @apiError NotFind Current user not find in the DB
 *
 * @apiErrorExample Error-Response:
 *     Not Find
 */


/**
 * @api {post} /auth/sign/  Request for sign in
 * @apiName sign
 * @apiGroup auth
 *
 * @apiParam  {Required} name Send it in the body of the request. Field name - name
 * @apiParam  {Required} surName Send it in the body of the request. Field name - surName
 * @apiParam  {NotRequired} dateOfBirth Send it in the body of the request. Format - 10-10-1990 , field name - dateOfBirth
 * @apiParam  {Required} email Send it in the body of the request. Field name - email
 * @apiParam  {Required} password Send it in the body of the request. Field name - password
 *
 * @apiSuccess String  Returns token with user info
 *
 * @apiSuccessExample Success-Response:
 *  "asfsdkpkpo23k4p23okfpsdock23po4k23opk2fopk423pokvp212234"
 *
 * @apiError NotFind Current user not find in the DB
 *
 * @apiErrorExample Error-Response:
 *     Not Find
 */