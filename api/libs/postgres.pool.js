const { Pool } = require('pg');

  const pool = new Pool({
    host: "snuffleupagus.db.elephantsql.com",
    // port: 5432,
    user: "nxbtxhuc",
    password: "NMhAsqTKypsuD0-Q2Pprm8mi0B9M61fa",
    database: "nxbtxhuc"
  });




module.exports = pool;

