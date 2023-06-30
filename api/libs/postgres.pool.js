const { Pool } = require('pg');


  const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "sales_frances",
    password: "SECRET",
    database: "sales_frances"
  });
 



module.exports = pool;

