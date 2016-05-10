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