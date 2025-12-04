const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Dinh tuyen cac API cho dang ki va dang nhap

router.post('/register', register);
router.post('/login', login);

module.exports = router;