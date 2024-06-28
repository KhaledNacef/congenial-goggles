const express = require('express');
const adminRouter = express.Router();
const adminController = require('../contorler/admin.c.js');

// Get all admins
adminRouter.get('/', adminController.getAllAdmins);

// Get admin by ID
adminRouter.get('/:id', adminController.getAdminById);

// Create a new admin - Here's where the issue might be
adminRouter.post('/signup', adminController.signupAdmin);

// Update an admin by ID
adminRouter.put('/:id', adminController.updateAdminById);

// Delete an admin by ID
adminRouter.delete('/:id', adminController.deleteAdminById);

// Login admin
adminRouter.post('/login', adminController.loginAdmin);

module.exports = adminRouter;
