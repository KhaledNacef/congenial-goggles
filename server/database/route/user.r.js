const express = require('express');
const router = express.Router();
const userController = require('../contorler/user.c.js');

const multer = require('multer');

// Multer configuration
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

// Route definition with multer middleware for file upload
router.post('/signup', upload.single('file'), userController.signupUser);


// Route for user login
router.post('/login', userController.loginUser);

// Route to get all users
router.get('/all', userController.getAllUsers);

// Route to get user by ID
router.get('/act/:AccountStatus', userController.getUserById);
router.get('/name/:Name', userController.getUserByName);

router.get('/:id', userController.getUserByid);
// Route to update user by ID
router.put('/:id', userController.updateUserById);

// Route to delete user by ID
router.delete('/:id', userController.deleteUserById);

// Route to stop user account by ID
router.put('/stop/:id', userController.stopUserAccountById);

module.exports = router;
