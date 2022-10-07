const jwt = require("jsonwebtoken");
nameValidator = (name) => {};
validateEmail = (email) => {
  let emailRegex = /^[a-z]{1}[a-z0-9_]+@[a-z0-9]+.[a-z]{2,}$/i;
  return emailRegex.test(email);
};
validatePassword = (password) => {
  let passwordRegex = /^[a-z0-9\S]{8,}$/;
  return passwordRegex.test(password);
};
generateToken = (data) => {
  let payload = { subject: data };
  let token = jwt.sign(payload, "secretKey");
  return token;
};
verifyToken = (token) => {
  let payload = jwt.verify(token, "secretKey");
  let userId = payload.subject;
  return userId;
};
module.exports = {
  nameValidator,
  validateEmail,
  validatePassword,
  generateToken,
  verifyToken,
};
