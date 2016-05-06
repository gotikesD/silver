const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart');


router.post('/', controller.addToOrder);

router.delete('/', controller.deleteFromOrder);

router.get('/view/:orderID', controller.viewOrder);

router.put('/', controller.changeOrder);

router.get('/confirm/:orderID', controller.confirmOrder);



module.exports = router;