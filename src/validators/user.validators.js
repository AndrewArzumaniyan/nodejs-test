import { body, param, validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

export const validateBalance = [
  param('userId')
    .isUUID()
    .withMessage('Invalid user ID format'),
  
  body('amount')
    .isFloat()
    .withMessage('Amount must be a number')
    .custom((value) => {
      if (value === 0) {
        throw new Error('Amount cannot be zero');
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, 'Validation Error', errors.array());
    }
    next();
  }
];