const { Pool } = require('pg');

const pool = new Pool({
  user: 'yairhdz24',
  host: 'localhost',
  database: 'alitas_lebro',
  password: 'yairhdz24',
  port: 5432,
});

module.exports = pool;
