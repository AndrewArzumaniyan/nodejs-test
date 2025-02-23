import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export class User extends Model {}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  balance: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true
});