//load env
require("dotenv").config({ path: "../.env" });
const axios = require("axios");
const { GOOGLE_FONTS_API } = process.env;
module.exports = async function main() {
  url = `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${GOOGLE_FONTS_API}`;
  let data = await axios.get(url).then((res) => res.data.items);
  let fonts = data.map((e) => ({ family: e.family, file: e.files.regular }));
  return fonts;
};
