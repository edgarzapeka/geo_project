require('dotenv').load();

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './server/db/migrations'
    },
    seeds: {
      directory: './server/db/seeds'
    }
  }
};
