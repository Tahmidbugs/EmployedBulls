const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();
const db = new Pool();

module.exports = db;
