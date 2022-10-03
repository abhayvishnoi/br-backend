//BASIC SETUP
const { MONGOURL, DBNAME, PORT, HOST, PRODUCTION } = require("./server_config");
const { mongoBoot } = require("./model/modelUtilities");
const router = require("./routing/router");
const app = require("express")();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const errorLogger = require("./errorLogger");
const fileUpload = require("express-fileupload");
//start mongoDB
mongoBoot(MONGOURL, DBNAME);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//protect headers
app.use(helmet());
//enable cors
corsOptions = {
  origin: ["localhost"],
};
app.use(cors());
//enable file-uploading
app.use(fileUpload());
//map routes
app.use("/", router);
app.use(errorLogger);

myapp = app.listen(PORT || 5000, PRODUCTION == "true" && HOST);
console.log(
  "PORT=>",
  PORT || 5000,
  `PRODUCTION[${PRODUCTION}] =>`,
  PRODUCTION == "true"
    ? `http://${HOST}:${PORT}`
    : `http://localhost:${myapp.address().port}`
);
// while (true) {
//   if ((Math.floor(Math.random()) * 100) % 23 === 0) {
//   }
// }
