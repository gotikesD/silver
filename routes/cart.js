const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart');


router.post('/', controller.addToOrder);

router.get('/view/:orderID', controller.viewOrder);

router.get('/confirm/:orderID', controller.confirmOrder);



module.exports = router;