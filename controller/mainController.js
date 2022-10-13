// const user = require("./user");
const googleFonts = require("../utilities/google-fonts");
exports.getGoogleFonts = async (req, res, next) => {
  try {
    let fonts = await googleFonts();
    // console.log(fonts);
    res.status(200).json({ message: fonts });
  } catch (err) {
    next(err);
  }
};
