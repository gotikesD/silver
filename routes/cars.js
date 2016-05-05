"use strict";
const express = require('express');
const router = express.Router();

const controller = require('../controllers/item');
const { checkRules } = require('../controllers/auth');

router.get('/', controller.getAll);

router.get('/cars/:id', controller.getSingle);


// available only  to the landlord

router.post('/new', checkRules , controller.addNew);


module.exports = router;