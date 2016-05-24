const express = require(`express`);
const router = express.Router();
const controller = require(`../controllers/cart`);
const authController = require(`../controllers/auth`);

router.post(`/`, authController.checkUserStatus, controller.addToOrder);

router.delete(`/:orderId`, authController.checkUserStatus, authController.cartRulesCheck, controller.deleteFromOrder);

router.put(`/:orderId`, authController.checkUserStatus, authController.cartRulesCheck, controller.changeOrder);

router.get(`/view/:cartId`, authController.checkUserStatus, authController.cartRulesCheck, controller.viewOrder);

router.post(`/confirm/:cartId`, authController.checkUserStatus, authController.cartRulesCheck, controller.confirmOrder);


module.exports = router;

/**
 * @api {post} /cart Add Car into basket
 * @apiName addToOrder
 * @apiGroup Basket
 * @apiParam  {Required} stockId Send it in the body of the request. Field name - stockId
 * @apiParam  {Required} userId Send it in the body of the request. Field name - userId
 * @apiSuccess String Return order ID
 *
 * @apiSuccessExample Success-Response:
 *  5731ed3de0be1da6445201e1
 *
 * @apiError MissFields UserId,StockId are required
 *
 * @apiErrorExample Error-Response:
 *    UserId,StockId are required
 */

/**
 * @api {delete} /cart Delete the Car from the basket
 * @apiName deleteFromOrder
 * @apiGroup Basket
 * @apiParam  {Required} stockId Send it in the body of the request. Field name - stockId
 * @apiParam  {Required} orderId Send it in the body of the request. Field name - orderId
 * @apiSuccess String Return order ID
 *
 * @apiSuccessExample Success-Response:
 *  5731ed3de0be1da6445201e1
 *
 * @apiError MissFields OrderId,StockId are required
 *
 * @apiErrorExample Error-Response:
 *    OrderId,StockId are required
 */

/**
 * @api {put} /cart Update car amount in the order
 * @apiName updateOrder
 * @apiGroup Basket
 * @apiParam  {Required} stockId Send it in the body of the request. Field name - stockId
 * @apiParam  {Required} orderId Send it in the body of the request. Field name - orderId
 * @apiParam  {Required} amount Send it in the body of the request. Field name - amount
 * @apiSuccess String Return amount of updated items
 *
 * @apiSuccessExample Success-Response:
 *  Modifed 0 items
 *
 * @apiError MissFields OrderId,StockId,amount are required
 *
 * @apiErrorExample Error-Response:
 *    OrderId,StockId,amount are required
 */


/**
 * @api {get} '/view/:orderId' View Order Info
 * @apiName viewOrder
 * @apiGroup Basket
 * @apiParam  {Required} orderId Send it as the query param of the request.
 * @apiSuccess {Object} Return info about order
 *
 * @apiSuccessExample Success-Response:
 *  {
 * "_id": "572c5278cad95edf18ac9a19",
 * "userId": "572b3ed33baead6c02a18c8a",
 * "__v": 0,
 * "createdAt": "2016-05-10T14:25:30.044Z",
 * "status": "pending",
 * "items": [
 *   {
 *     "stockId": "111",
 *     "_id": "572c5278cad95edf18ac9a1a",
 *     "amount": 1
 *   },
 *   {
 *     "stockId": "111",
 *     "_id": "572c5286cad95edf18ac9a1b",
 *     "amount": 1
 *   }
 * ]
 * }
 *
 * @apiError MissField OrderId required
 *
 * @apiErrorExample Error-Response:
 *    OrderID required
 */


/**
 * @api {get} '/confirm/:orderId' Confirm Order
 * @apiName confirmOrder
 * @apiGroup Basket
 * @apiParam  {Required} orderId Send it as the query param of the request.
 * @apiSuccess String Return confirmed order Id
 *
 * @apiSuccessExample Success-Response:
 *  5731ed3de0be1da6445201e1
 *
 * @apiError MissField OrderId required
 *
 * @apiErrorExample Error-Response:
 *    OrderId required
 */