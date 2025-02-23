import express from 'express';
import { sequelize } from './config/database.js';
import { userRouter } from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { umzug } from './migrations/runMigrations.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

// Routes
app.use('/api/users', userRouter);

// Error handling
app.use(errorHandler);

// Database connection, migrations and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    
    await umzug.up();
    console.log('Migrations completed successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();