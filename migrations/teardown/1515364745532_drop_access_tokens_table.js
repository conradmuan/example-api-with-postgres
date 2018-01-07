require('dotenv').config();
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: (process.env.ENVIRONMENT === 'local' ? false : true),
});

(async function() {
  const query = `DROP TABLE access_tokens`;
  client.connect();
  try {
    const response = await client.query(query);
    console.log('access_tokens run successfully');
  } catch(err) {
    console.error('access_tokens did not run successfully!');
    console.error(err.stack);
  } finally {
    client.end();
  }
})();