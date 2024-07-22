const express = require('express');
const router = express.Router();
const soldvetrineController = require('../contorler/soldedvetrine.c.js');

// Route to get all sold products
router.get('/soldvetrine/:userId', soldvetrineController.getAllSoldedVetrines);


module.exports = router;
