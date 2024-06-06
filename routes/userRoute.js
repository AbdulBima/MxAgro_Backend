const { check, validationResult } = require('express-validator');
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUserByIdAndUpdate,
  updateUserPassword
} = require("../controllers/usersController");
const User = require("../models/userModel");
const express = require("express");

const router = express.Router();
const cookieParser = require('cookie-parser'); // Import cookie-parser

// Use cookie-parser middleware
router.use(cookieParser());

// Validation middleware for user registration
const validateCreateUser = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation middleware for user login
const validateLoginUser = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation middleware for updating user details
const validateUpdateUser = [
  check('name').optional().notEmpty().withMessage('Name cannot be empty'),
  check('email').optional().isEmail().withMessage('Valid email is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation middleware for changing user password
const validateUpdatePassword = [
  check('oldPassword').notEmpty().withMessage('Old password is required'),
  check('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.post('/register', validateCreateUser, createUser);
router.post('/login', validateLoginUser, loginUser);
router.get('/all', getAllUsers);
router.get('/:id', getUserById);
router.put('/update', validateUpdateUser, getUserByIdAndUpdate);
router.post('/change-password', validateUpdatePassword, updateUserPassword);

module.exports = router;
