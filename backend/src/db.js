const { Pool } = require('pg');

// Let the pg library read PG* env vars from .env
const pool = new Pool();

module.exports = { pool };