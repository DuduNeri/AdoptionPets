import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pf',
  password: 'nova_senha',
  port: 5432
});

export default pool;
