const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

// Signup route
router.post('/signup',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 chars'),
    
  ],
  authController.signup
);

// Login route

router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').exists().withMessage('Password required')
  ],
  authController.login
);

// Password reset

router.post('/request-reset', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);

router.get('/profile', authMiddleware, authController.getProfile);

router.get('/admin/users', authMiddleware, requireRole('admin'), authController.getUserList);

module.exports = router;