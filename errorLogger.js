const fs = require("fs");
const { PRODUCTION } = require("./server_config");
const logger = (err, req, res, next) => {
  if (err) {
    fs.appendFile(
      "error.log",
      `${new Date().toDateString()} - ${err.message} ${
        PRODUCTION === "false" ? err.stack : err.stack
      }\n`,
      (error) => {
        if (error) {
          console.log("Logging Failed");
        }
      }
    );
    console.log("Error", err.message);
    res.status(400).json({ message: err.message });
  }
};
module.exports = logger;
