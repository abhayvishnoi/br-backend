const dotenv = require("dotenv");
dotenv.config();
const { MONGOURL, DBNAME, PORT, PRODUCTION, HOST } = process.env;
const requirements = {
  MONGOURL,
  DBNAME,
  PORT,
  PRODUCTION,
  HOST,
};
console.log(requirements);
module.exports = requirements;
