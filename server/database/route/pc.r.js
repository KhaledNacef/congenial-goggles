const express = require('express');
const router = express.Router();
const pcController = require('../contorler/pc.c.js');

// Route to create a new Pc
router.post('/crate', pcController.createPc);

// Get all phones
router.get('/all/:userId', pcController.getAllPc);

// Update the status of a phone by ID
router.put('/statusup/:userId/:id', pcController.updatePcStatus);

// Get phones by status
router.get('/status/:userId/:status', pcController.getPcByStatus);

// Get phones delivered today
router.get('/deliveredtoday/:userId', pcController.getPcDeliveredToday);

// Get phones with status "waiting"
router.get('/waitingpc/:userId', pcController.getWaitingPc);

// Get phones by phoneHolder or holderNumber
router.put('/price/:userId/:id', pcController.updatePcPrice);

router.delete('/delete/:userId/:id', pcController.deletepc);

module.exports = router;
