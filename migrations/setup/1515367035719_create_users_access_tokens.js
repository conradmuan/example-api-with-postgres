require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: (process.env.ENVIRONMENT === 'local' ? false : true),
});

(async function() {
  const query = `CREATE TABLE users_access_tokens (
    user_id   uuid REFERENCES users (id) ON DELETE CASCADE,
    token_id  uuid REFERENCES access_tokens (id) ON DELETE CASCADE
  )`;
  client.connect();
  try {
    const response = await client.query(query);
    console.log('users_access_tokens run successfully');
  } catch(err) {
    console.error('users_access_tokens did not run successfully!');
    console.error(err.stack);
  } finally {
    client.end();
  }
})();