require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: (process.env.ENVIRONMENT === 'local' ? false : true),
});

(async function() {
  const query = `DROP TABLE users`;
  client.connect();
  try {
    const response = await client.query(query);
    console.log('drop_users_table run successfully');
  } catch(err) {
    console.error('drop_users_table did not run successfully!');
    console.error(err.stack);
  } finally {
    client.end();
  }
})();