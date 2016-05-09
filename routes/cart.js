const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart');


router.post('/', controller.addToOrder);

router.delete('/', controller.deleteFromOrder);

router.put('/', controller.changeOrder);

router.get('/view/:orderId', controller.viewOrder);

router.get('/confirm/:orderId', controller.confirmOrder);



module.exports = router;