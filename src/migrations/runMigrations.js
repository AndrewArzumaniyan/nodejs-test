import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '../config/database.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const umzug = new Umzug({
  migrations: {
    glob: ['[0-9]*.js', { cwd: __dirname }],
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// run migrations if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  umzug.up().then(() => {
    console.log('All migrations performed successfully');
    process.exit(0);
  });
}