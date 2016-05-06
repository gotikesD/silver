"use strict";
const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin');
const { adminCheck } = require('../controllers/auth');

router.post('/allUsers', adminCheck, controller.getAllUsers);

router.delete('/deleteUser', adminCheck, controller.deleteUser);


module.exports = router;