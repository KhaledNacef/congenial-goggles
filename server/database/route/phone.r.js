const express = require('express');
const router = express.Router();
const phoneController = require('../contorler/phone.c.js')

// Create a new phone
router.post('/tel/crate', phoneController.createPhone);

// Get all phones
router.get('/all/:userId', phoneController.getAllPhones);

// Update the status of a phone by ID
router.put('/status/:userId/:id', phoneController.updatePhoneStatus);

// Get phones by status
router.get('/status/:userId/:status', phoneController.getPhonesByStatus);

// Get phones delivered today
router.get('/deliveredtoday/:userId', phoneController.getPhonesDeliveredToday);

// Get phones with status "waiting"
router.get('/waiting/:userId', phoneController.getWaitingPhones);

// Get phones by phoneHolder or holderNumber
router.put('/price/:userId/:id', phoneController.updatePhonePrice);

router.delete('/delete/:userId/:id', phoneController.deletePhone);


module.exports = router;
