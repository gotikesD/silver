"use strict";
const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const validation = require('../controllers/validation');

router.post('/login',validation.loginValidation, controller.loginPost);

router.post('/sign',validation.signValidation,controller.signPost);


module.exports = router;