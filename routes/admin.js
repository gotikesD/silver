"use strict";
const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin');
const { adminCheck } = require('../controllers/auth');

router.post('/allUsers', adminCheck, controller.getAllUsers);

router.delete('/deleteUser', adminCheck, controller.deleteUser);

router.post('/topCars', adminCheck, controller.viewTopCars);

router.post('/topUsers', adminCheck, controller.viewTopUsers);

router.post('/lastOrders', adminCheck, controller.viewLastWeekOrders);


module.exports = router;