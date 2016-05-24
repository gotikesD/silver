"use strict";
const express = require(`express`);
const router = express.Router();


const controller = require(`../controllers/item`);
const authController = require(`../controllers/auth`);

router.get(`/count`, controller.getAllCount);
router.get(`/`, controller.getAll);
router.get(`/cars/top`, controller.viewTopCars);
router.get(`/cars/:id`, controller.getSingle);
router.post(`/cars`, authController.checkUserStatus, controller.addNew);

// available only  to the advanced user

router.delete(`/advanced/cars`, authController.checkUserStatus, authController.checkRules, authController.checkOwnCar, controller.deleteCar);
router.put(`/advanced/cars`, authController.checkUserStatus, authController.checkRules, authController.checkOwnCar, controller.updateCar);

router.get(`/advanced/cars/`, authController.checkUserStatus, authController.checkRules, controller.viewAllUserCars);
router.get(`/advanced/cars/:carId`, authController.checkUserStatus, authController.checkRules, controller.viewSingleUserCar);


module.exports = router;

/**
 * @api {get} /  Request for home page
 * @apiName getAllCars
 * @apiGroup Home

 * @apiSuccess [Array]  Return info about all cars(_id,color,model,retailPrice)
 *
 * @apiSuccessExample Success-Response:
 *  [
 *{
 *  "_id": "5731afcbc2eaafe41f4e26c5",
 *  "model": "G55",
 *  "color": "BLACK",
 *  "retailPrice": 0
 *},
 *{
 *  "_id": "5731afcbc2eaafe41f4e26c6",
 *  "model": "C300W4",
 *  "color": "",
 *  "retailPrice": 5159000
 *}
 *]
 */

/**
 * @api {get} /cars/:id  Request for get single car info
 * @apiName getSingleCar
 * @apiGroup Home
 *
 * @apiParam  {Required} carId Sends as the query param
 * @apiSuccess {Object} carInfo  Return info about single car
 *
 * @apiSuccessExample Success-Response:
 * {
 *  "_id": "5731afcbc2eaafe41f4e26c6",
 *  "stockId": "112",
 *  "VINCode": "55SWF4KB1FU091383",
 *  "make": "MERCEDES-BENZ",
 *  "model": "C300W4",
 *  "color": "",
 *  "year": 2015,
 *  "mileage": 10,
 *  "carState": "New",
 *  "transmissionType": "Manual",
 *  "cost": 18500,
 *  "__v": 0,
 *  "bought": 0,
 *  "amount": 1,
 *  "internationalPrice": 0,
 *  "askPrice": 5159000,
 *  "retailPrice": 5159000,
 *  "createdAt": "2016-05-10T09:54:19.245Z"
 * }
 * @apiError NotFind Car with current carId not find
 *
 * @apiErrorExample Error-Response:
 *     Not Find
 */


/**
 * @api {post} /new  Request for writing new car into DB
 * @apiName newCar
 * @apiGroup Home
 *
 * @apiParam  {Required} stockId Send it in the body of the request. Field name - stockId
 * @apiParam  {Required} userId Send it in the body of the request. Field name - userId
 * @apiParam  {Required} VinCode Send it in the body of the request. Field name - userId
 * @apiParam  {Required} make Send it in the body of the request. Field name - make
 * @apiParam  {Required} model Send it in the body of the request. Field name - model
 * @apiParam  {NotRequired} color Send it in the body of the request. Field name - color
 * @apiParam  {NotRequired} year Send it in the body of the request. Field name - year
 * @apiParam  {NotRequired} mileage Send it in the body of the request. Field name - mileage
 * @apiParam  {NotRequired} carState Send it in the body of the request. Field name - carState
 * @apiParam  {NotRequired} transmissionType Send it in the body of the request. Field name - transmissionType
 * @apiParam  {NotRequired} entryDate Send it in the body of the request. Field name - entryDate
 * @apiParam  {NotRequired} cost Send it in the body of the request. Field name - cost
 * @apiParam  {NotRequired} dealerId Send it in the body of the request. Field name - dealerId
 * @apiParam  {NotRequired} internationalPrice Send it in the body of the request. Field name - internationalPrice
 * @apiParam  {NotRequired} askPrice Send it in the body of the request. Field name - askPrice
 * @apiParam  {NotRequired} retailPrice Send it in the body of the request. Field name - retailPrice
 *
 * @apiSuccessExample Success-Response:
 *{
 *  "__v": 0,
 *  "stockId": "1020301",
 *  "available": true,
 *  "make": "Fake",
 *  "model": "Fake V-Power",
 *  "color": "Red",
 *  "year": 2000,
 *  "mileage": 999,
 *  "carState": "Used",
 *  "transmissionType": "Manual",
 *  "entryDate": "2015-10-09T21:00:00.000Z",
 * "cost": 125000,
 *  "dealerId": 222,
 * "_id": "5731e71fe0be1da6445201df",
 *  "bought": 0,
 *  "amount": 1,
 *  "internationalPrice": 125000,
 *  "askPrice": 125000,
 *  "retailPrice": 125000,
 *  "createdAt": "2016-05-10T13:50:21.775Z"
 * }
 */

/**
 * @api {delete} /delete Deleting Single Car
 * @apiName deleteSingleCar
 * @apiGroup Advanced
 * @apiParam  {Required} stockId Send it in the body of the request. Field name - stockId

 * @apiSuccess String Return String
 *
 * @apiSuccessExample Success-Response:
 *  Deleted from cars DB and user DB
 *
 * @apiError NotFind Cars with this stockId not Found
 *
 * @apiErrorExample Error-Response:
 *     Cars with this stockId not Found
 */


/**
 * @api {update} /update  Request for updating car
 * @apiName updateCar
 * @apiGroup Advanced
 *
 * @apiParam  {Required} stockId Send it in the body of the request. Field name - stockId
 * @apiParam  {Required} userId Send it in the body of the request. Field name - userId
 * @apiParam  {NotRequired} VinCode Send it in the body of the request. Field name - userId
 * @apiParam  {NotRequired} make Send it in the body of the request. Field name - make
 * @apiParam  {NotRequired} model Send it in the body of the request. Field name - model
 * @apiParam  {NotRequired} color Send it in the body of the request. Field name - color
 * @apiParam  {NotRequired} year Send it in the body of the request. Field name - year
 * @apiParam  {NotRequired} mileage Send it in the body of the request. Field name - mileage
 * @apiParam  {NotRequired} carState Send it in the body of the request. Field name - carState
 * @apiParam  {NotRequired} transmissionType Send it in the body of the request. Field name - transmissionType
 * @apiParam  {NotRequired} entryDate Send it in the body of the request. Field name - entryDate
 * @apiParam  {NotRequired} cost Send it in the body of the request. Field name - cost
 * @apiParam  {NotRequired} dealerId Send it in the body of the request. Field name - dealerId
 * @apiParam  {NotRequired} internationalPrice Send it in the body of the request. Field name - internationalPrice
 * @apiParam  {NotRequired} askPrice Send it in the body of the request. Field name - askPrice
 * @apiParam  {NotRequired} retailPrice Send it in the body of the request. Field name - retailPrice
 *
 * @apiSuccessExample Success-Response:
 *{
 *  "__v": 0,
 *  "stockId": "1020301",
 *  "available": true,
 *  "make": "NewFake",
 *  "model": "NewFake V-Power",
 *  "color": "Red",
 *  "year": 2000,
 *  "mileage": 999,
 *  "carState": "Used",
 *  "transmissionType": "Manual",
 *  "entryDate": "2015-10-09T21:00:00.000Z",
 * "cost": 125000,
 *  "dealerId": 222,
 * "_id": "5731e71fe0be1da6445201df",
 *  "bought": 0,
 *  "amount": 1,
 *  "internationalPrice": 125000,
 *  "askPrice": 125000,
 *  "retailPrice": 125000,
 *  "createdAt": "2016-05-10T13:50:21.775Z"
 * }
 * @apiError NotFind Cars with this stockId not Found
 *
 * @apiErrorExample Error-Response:
 *     Cars with this stockId not Found
 */

