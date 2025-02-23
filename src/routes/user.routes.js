import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { validateBalance } from '../validators/user.validators.js';

export const userRouter = Router();

userRouter.patch('/:userId/balance', 
  validateBalance,
  UserController.updateBalance
);

userRouter.get('/',
  UserController.getAllUsers
)