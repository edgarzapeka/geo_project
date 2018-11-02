const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL
}); 

client.connect();

module.exports = (query, params = []) => client.query(query, params).then(result => result.rows);
