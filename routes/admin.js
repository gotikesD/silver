"use strict";
const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin');
const { adminCheck } = require('../controllers/auth');

router.get('/allUsers/:userId', adminCheck, controller.getAllUsers);

router.delete('/deleteUser/:userId', adminCheck, controller.deleteUser);

router.get('/topCars/:userId', adminCheck, controller.viewTopCars);

router.get('/topUsers/:userId', adminCheck, controller.viewTopUsers);

router.get('/lastOrders/:userId', adminCheck, controller.viewLastWeekOrders);


module.exports = router;

/**
 * @api {get} /admin/allUsers/:userId Request for All of users information
 * @apiName allUsers
 * @apiGroup admin
 *
 * @apiParam  {Required} userId Only if user is an admin , he can research this route
 *
 * @apiSuccess [Array] Users Info(_id,email,dateOfBirth,name).
 *
 * @apiSuccessExample Success-Response:
 *     [
 *      {
 *       "_id": "1234567891321",
 *       "email": "docs@mail.ru",
 *       "dateOfBirth : "10-10-1990",
 *       "name" : "Name"
 *      },
 *      {
 *       "_id": "12345678913221",
 *       "email": "docs2@mail.ru",
 *       "dateOfBirth : "10-10-1990",
 *       "name" : "Name"
 *      }
 *     ]
 *
 * @apiError Permission Current user is not a Admin
 *
 * @apiErrorExample Error-Response:
 *     Permission Denied
 */


/**
 * @api {get} /admin/topCars/:userId Request for top five sold cars
 * @apiName topCars
 * @apiGroup admin
 *
 * @apiParam  {Required} userId Only if user is an admin , he can research this route
 *
 * @apiSuccess [Array] Cars Info for top 5 sold cars .
 *
 * @apiSuccessExample Success-Response:
 *     [
 *      {
 *       "_id": "5731afcbc2eaafe41f4e26c5",
 *       "stockId": "111",
 *       "VINCode": "WDCYC7BF3BX190255",
 *       "make": "MERCEDES-BENZ","model": "G55",
 *       "color": "BLACK",
 *       "year": 2011,
 *       "mileage": 18234,
 *       "carState": "Used",
 *       "transmissionType": "Manual",
 *       "cost": 9425000,
 *       "__v": 0,
 *       "bought": 0,
 *       "amount": 1,
 *       "internationalPrice": 0,
 *       "askPrice": 0,
 *       "retailPrice": 0,
 *       "createdAt": "2016-05-10T09:54:19.245Z"
 *      },
 *          {
 *       "_id": "5731afcbc2ef4e23423c5",
 *       "stockId": "112",
 *       "VINCode": "WDCYC7BF3BX190255",
 *       "make": "MERCEDES-BENZ","model": "G55",
 *       "color": "BLACK",
 *       "year": 2011,
 *       "mileage": 18234,
 *       "carState": "Used",
 *       "transmissionType": "Manual",
 *       "cost": 9425000,
 *       "__v": 0,
 *       "bought": 0,
 *       "amount": 1,
 *       "internationalPrice": 0,
 *       "askPrice": 0,
 *       "retailPrice": 0,
 *       "createdAt": "2016-05-10T09:54:19.245Z"
 *      },
 *     ]
 *
 * @apiError Permission Current user is not a Admin
 *
 * @apiErrorExample Error-Response:
 *     Permission Denied
 */


/**
 * @api {get} /admin/topCars/:userId Request for top five sold cars
 * @apiName topCars
 * @apiGroup admin
 *
 * @apiParam  {Required} userId Only if user is an admin , he can research this route
 *
 * @apiSuccess [Array] Cars Info for top 5 sold cars .
 *
 * @apiSuccessExample Success-Response:
 *     [
 *      {
 *       "_id": "5731afcbc2eaafe41f4e26c5",
 *       "stockId": "111",
 *       "VINCode": "WDCYC7BF3BX190255",
 *       "make": "MERCEDES-BENZ","model": "G55",
 *       "color": "BLACK",
 *       "year": 2011,
 *       "mileage": 18234,
 *       "carState": "Used",
 *       "transmissionType": "Manual",
 *       "cost": 9425000,
 *       "__v": 0,
 *       "bought": 0,
 *       "amount": 1,
 *       "internationalPrice": 0,
 *       "askPrice": 0,
 *       "retailPrice": 0,
 *       "createdAt": "2016-05-10T09:54:19.245Z"
 *      },
 *          {
 *       "_id": "5731afcbc2ef4e23423c5",
 *       "stockId": "112",
 *       "VINCode": "WDCYC7BF3BX190255",
 *       "make": "MERCEDES-BENZ","model": "G55",
 *       "color": "BLACK",
 *       "year": 2011,
 *       "mileage": 18234,
 *       "carState": "Used",
 *       "transmissionType": "Manual",
 *       "cost": 9425000,
 *       "__v": 0,
 *       "bought": 0,
 *       "amount": 1,
 *       "internationalPrice": 0,
 *       "askPrice": 0,
 *       "retailPrice": 0,
 *       "createdAt": "2016-05-10T09:54:19.245Z"
 *      },
 *     ]
 *
 * @apiError Permission Current user is not a Admin
 *
 * @apiErrorExample Error-Response:
 *     Permission Denied
 */



/**
 * @api {get} /admin/topUsers/:userId Request for top five users
 * @apiName topUsers
 * @apiGroup admin
 *
 * @apiParam  {Required} userId Only if user is an admin , he can research this route
 *
 * @apiSuccess [Array] Info for 5 users with higher field 'sendOrders'.
 *
 * @apiSuccessExample Success-Response:
 *[
 *{
 * "_id": "573194ccd146638f11967807",
 *  "name": "Test3",
 *  "surName": "Test3",
 *  "email": "test3@mail.ru",
 *  "password": "$2a$10$L7khGg/v9Qps2spOKxtTrei/axhviivf.714PJZd1icDLXXXUqVNa",
 *  "__v": 0,
 *  "ownCars": [],
 *  "sendOrders": 0,
 *  "rules": "Simple",
 *  "createdAt": "2016-05-10T07:58:20.079Z"
 *},
 *{
 *  "_id": "5731aca0802e70481efa7acb",
 *  "name": "Test4",
 *  "surName": "Test4",
 *  "email": "test5@mail.ru",
 *  "password": "$2a$10$YNfJ/Uf5L1SLFyf72F2o9./O/g3R/DQ.D8uoeh7xB4.vnognJSvHS",
 *  "__v": 0,
 *  "ownCars": [
 *    "5244556",
 *    "5244556",
 *    "5244556"
 *  ],
 *  "sendOrders": 0,
 *  "rules": "Advanced",
 *  "createdAt": "2016-05-10T09:40:46.840Z"
 * }
 * ]
 *
 * @apiError Permission Current user is not a Admin
 *
 * @apiErrorExample Error-Response:
 *     Permission Denied
 */

/**
 * @api {get} /admin/lastOrders/:userId  Request for last week orders
 * @apiName lastOrders
 * @apiGroup admin
 *
 * @apiParam  {Required} userId Only if user is an admin , he can research this route
 *
 * @apiSuccess [Array] Return array of orders not later last week.
 *
 * @apiSuccessExample Success-Response:
 *[
 *  "Sunday 0",
 *  "Monday 0",
 *  "Tuesday 1",
 *  "Wednesday 0",
 *   "Thursday 0",
 *  "Friday 0",
 *  "Saturday 0"
 * ]
 *
 * @apiError Permission Current user is not a Admin
 *
 * @apiErrorExample Error-Response:
 *     Permission Denied
 */


/**
 * @api {delete} /admin/delete/:userId  Request for deleting user from DB
 * @apiName deleteUser
 * @apiGroup admin
 *
 * @apiParam  {Required} userId Only if user is an admin , he can research this route( sends as a query param  )
 * @apiParam  {Required} deletingUser Id of user which will be delete(sends in the body of the request. Field name - userId)
 *
 * @apiSuccess String   Delete user from DB and return the string.
 *
 * @apiSuccessExample Success-Response:
 *  "Deleted!"
 *
 * @apiError Permission Current user is not a Admin
 *
 * @apiErrorExample Error-Response:
 *     Permission Denied
 */