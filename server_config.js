const dotenv = require("dotenv");
dotenv.config();
const { MONGOURL, DBNAME, PORT, PRODUCTION, HOST, GOOGLE_FONTS_API } =
  process.env;
const requirements = {
  MONGOURL,
  DBNAME,
  PORT,
  PRODUCTION,
  HOST,
  GOOGLE_FONTS_API,
};
console.log(requirements);
module.exports = requirements;
