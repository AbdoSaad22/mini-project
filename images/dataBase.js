const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',      // Your PostgreSQL username
    host: 'localhost',          // Your database host
    database: 'postgres',  // Your database name
    password: '123456',  // Your PostgreSQL password
    port: 5432,                 // Default PostgreSQL port
  });
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Connection error', err.stack);
    } else {
      console.log('Connected to PostgreSQL');
      done();
    }
  });

module.exports = pool;
