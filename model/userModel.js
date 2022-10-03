const { createModel, createSchema } = require("./modelUtilities");
const userSchema = createSchema({
  uid: String,
  name: String,
  email: { type: String, unique: true, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
  dateOfJoining: { type: Date, default: Date.now() },
  planId: String,
  brandIds: [String],
});
users = createModel("users", userSchema);
module.exports = users;
