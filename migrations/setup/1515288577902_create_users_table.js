require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: (process.env.ENVIRONMENT === 'local' ? false : true),
});

(async function() {
  const query = `CREATE TABLE users (
    id          uuid PRIMARY KEY,
    email       varchar,
    name        varchar,
    password    varchar,
    created_on  timestamp,
    updated_on  timestamp,
    deleted_on  timestamp
  )`;
  client.connect();
  try {
    const response = await client.query(query);
    console.log('create_users_table run successfully');
  } catch(err) {
    console.error('create_users_table did not run successfully!');
    console.error(err.stack);
  } finally {
    client.end();
  }
})();