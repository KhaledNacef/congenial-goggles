const express = require('express');
const router = express.Router();
const soldProductController = require('../contorler/solded.js');

// Route to get all sold products
router.get('/soldproducts/:userId', soldProductController.getAllSoldProducts);

// Route to get sold products by month and year
router.get('/soldproducts/:month/:year', soldProductController.getSoldProductsByMonthAndYear);

module.exports = router;
