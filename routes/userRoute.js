const express = require('express');
const authController = require('./../controllers/authController');
const router = express.Router();

// http://127.0.0.1:5000/user/signup (signup routes)
router.post('/signup', authController.signup);

module.exports = router;
