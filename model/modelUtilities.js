const mongoose = require("mongoose");
exports.mongoBoot = (MONGOURL, DBNAME) =>
  mongoose.connect(`${MONGOURL}/${DBNAME}`).then(
    (success) => console.log("Connected to db"),
    (failed) => console.log(`error connecting DB (${mongourl}) ${failed}`)
  );

exports.createSchema = (schema) => {
  return new mongoose.Schema(schema);
};

exports.createModel = (modelName, schema) => {
  return mongoose.model(modelName, schema);
};
