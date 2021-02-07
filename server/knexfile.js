const path = require('path');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      port: '5432',
      database: 'caring-challenge',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds'),
    },
  },
};