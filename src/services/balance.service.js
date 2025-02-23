import { User } from '../models/user.model.js';
import { sequelize } from '../config/database.js';
import { ApiError } from '../utils/ApiError.js';

export class BalanceService {
  static async updateBalance(userId, amount) {
    const transaction = await sequelize.transaction();

    try {
      const user = await User.findByPk(userId, {
        lock: transaction.LOCK.UPDATE,
        transaction
      });

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      const newBalance = Number(user.balance) + Number(amount);

      if (newBalance < 0) {
        throw new ApiError(400, 'Insufficient funds');
      }

      user.balance = newBalance;
      await user.save({ transaction });
      await transaction.commit();

      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async getAllUsers() {
    return User.findAll();
  }
}