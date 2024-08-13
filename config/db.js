const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT_DATABASE,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
});

pool
  .connect()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((error) => {
    console.error('Error en la conexión a la base de datos', error);
  });

module.exports = pool;
