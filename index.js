const express = require("express");
const helmet = require("helmet");
const knex = require("knex")

const knexConfig = {
    client: "sqlite3",
    connection: {
      filename: "./data/rdb.sqlite3"
    },
    useNullAsDefault: true
  };

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});