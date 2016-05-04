"use strict";
const express = require('express');
const router = express.Router();

const controller = require('../controllers/item');

router.get('/', controller.getAll);

router.get('/cars/:id', controller.getSingle);


module.exports = router;