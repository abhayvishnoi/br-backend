const users = require("../model/userModel");
const {
  validateEmail,
  validatePassword,
  generateToken,
} = require("../utilities/helper");
exports.signup = async (req, res, next) => {
  try {
    let { email, password, passwordConfirm } = req.body;
    email = email.toLowerCase();
    if (validateEmail(email)) {
      if (validatePassword(password) && validatePassword(passwordConfirm)) {
        if (password === passwordConfirm) {
          user = await users.findOne({ email: email });
          if (user) {
            res.status(400).json({
              message: "User with this email already exists",
            });
          } else {
            user = await users.create({
              email: email,
              password: password,
            });

            res.status(200).json({
              message: "Signup Successfull",
              token: generateToken(user._id),
            });
          }
        } else {
          res.status(400).json({
            message: "Confirmed password do not match",
          });
        }
      } else {
        res.status(400).json({
          message: "Please use a strong password ",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Email Id",
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);
    email = email.toLowerCase();
    if (validateEmail(email)) {
      user = await users.findOne({ email: email });
      if (user) {
        if (user.password === password) {
          res.status(200).json({
            message: "Login Successfull",
            token: generateToken(user._id),
          });
        } else {
          res.status(400).json({
            message: "Wrong Password",
          });
        }
      } else {
        res.status(400).json({
          message: "Email does not exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Email Id",
      });
    }
  } catch (error) {
    next(error);
  }
};
