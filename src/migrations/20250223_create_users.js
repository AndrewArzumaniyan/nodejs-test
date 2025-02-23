import { Sequelize } from 'sequelize';

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  
  await queryInterface.createTable('Users', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    balance: {
      type: Sequelize.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  // Add initial user with 10000 balance
  await queryInterface.bulkInsert('Users', [{
    id: Sequelize.literal('uuid_generate_v4()'),
    balance: 10000,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('Users');
}