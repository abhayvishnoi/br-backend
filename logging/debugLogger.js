const loglevel = require("loglevel");
loglevel.setLevel("DEBUG");
module.exports = (msg) => {
  loglevel.debug(msg);
};
