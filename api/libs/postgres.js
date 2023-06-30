const { Client } = require('pg');

async function getConection (){
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "sales_frances",
    password: "SECRET",
    database: "sales_frances"
  });
  await client.connect();
  return client;
}

module.exports = getConection;

