const { body, validationResult } = require('express-validator'); 

const validateUser = [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage('Invalid email format')
      
  ];