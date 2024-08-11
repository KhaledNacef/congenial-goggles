const express = require('express');
const router = express.Router();
const Credit= require('../contorler/credit.c.js'); // Adjust the path as necessary

// Create a new credit
router.post('/createc', Credit.createCredit);

// Get all credits by userId
router.get('/getcredit/:userId', Credit.getCreditsByUserId);


// Update the date of a credit by ID and userId
router.put('/updatedate/:userId/:id', Credit.updatedate);

// Update the pay of a credit by ID and userId
router.put('/updatepay/:userId/:id', Credit.updateCpay);

// Delete a credit by ID
router.delete('/deletec/:userId/:id', Credit.deleteCredit);

module.exports = router;
