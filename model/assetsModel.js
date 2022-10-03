const { createModel, createSchema } = require("./modelUtilities");
//make html
const htmlSchema = createSchema({
  id: Number,
  content: String,
});

// make dynamic templates from html
const templateSchema = createSchema({
  id: Number,
  socialmedia: String,
  width: String,
  height: String,
  html: String,
  colors: [String],
});
const brandSchema = createSchema({
  id: Number,
  assetIds: [String],
  brandName: String,
  tempIds: [String],
});

const brandColorsSchema = createSchema({
  id: Number,
  brandId: Number,
  color: {
    type: String,
    unique: true,
  },
});

const brandAssetsSchema = createSchema({
  brandId: Number,
  name: String,
  url: String,
});

const planSchema = createSchema({
  id: Number,
  planName: String,
  planDescription: String,
  price: String,
  validity: String,
});

templates = createModel("templates", templateSchema);
brands = createModel("brand", brandSchema);
brandAssets = createModel("brandAssets", brandAssetsSchema);
brandColors = createModel("brandColors", brandColorsSchema);
plans = createModel("plans", planSchema);
module.exports = { templates, brands, brandAssets, plans, brandColors };
