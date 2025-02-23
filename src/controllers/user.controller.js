import { BalanceService } from '../services/balance.service.js';
import { ApiError } from '../utils/ApiError.js';

export class UserController {
  static async updateBalance(req, res, next) {
    try {
      const { userId } = req.params;
      const { amount } = req.body;

      if (!amount || isNaN(amount)) {
        throw new ApiError(400, 'Invalid amount');
      }

      const updatedUser = await BalanceService.updateBalance(userId, amount);

      res.json({
        success: true,
        data: {
          userId: updatedUser.id,
          balance: updatedUser.balance
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await BalanceService.getAllUsers();

      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      next(error);
    }
  }
}