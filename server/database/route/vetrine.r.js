const express = require('express');
const router = express.Router();
const vetrineController = require('../contorler/vetrine.c.js')

// Route to create a new Vetrine
router.post('/vetrines', vetrineController.createVetrine);

// Route to get all Vetrines
router.get('/vetrinesgetall/:userId', vetrineController.getAllVetrines);

router.get('/vetrinesgetstatus/:userId/:status', vetrineController.getstatusVetrines);

// Route to delete a Vetrine by ID
router.put('/vetrinesatuts/:userId/:id', vetrineController.updateVetrineBystatus);

router.delete('delvetrine/:userId/:id',vetrineController.deleteVetrineById)
// Route to sell a Vetrine
router.put('/vetrinesell/:vetrineId/:userId', vetrineController.sellVetrine);

module.exports = router;
