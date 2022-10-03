const {
  templates,
  brands,
  brandAssets,
  plans,
  brandColors,
} = require("../model/assetsModel");
const { extractor } = require("../utilities/extractColors");
const debugLog = require("../logging/debugLogger");
class Template {
  constructor(templateId) {
    this.id = templateId;
  }
  async getTemplate() {
    return await templates.findOne({ id: this.id });
  }
  async createTemplate(sociamedia, width, height, colors, html) {
    const lastDoc = await templates.find().sort({ id: -1 }).limit(1);
    let id = lastDoc.length > 0 ? lastDoc[0].id + 1 : 0;
    debugLog(`last ID => ${id}`);
    return await templates.create({
      id: id,
      sociamedia: sociamedia,
      width: width,
      height: height,
      colors: colors,
      html: html,
    });
  }
  async updateTemplate(update) {
    debugLog(update);
    return await templates.updateOne({ id: this.id }, { $set: { ...update } });
  }
  async deleteTemplate() {
    return await templates.deleteOne({ id: this.id });
  }
}

class Brand {
  constructor(brandId) {
    this.id = brandId;
  }
  async getBrand() {
    return await brands.findOne({ id: this.id });
  }
  async createBrand(brandName) {
    const lastDoc = await brands.find().sort({ id: -1 }).limit(1);
    let id = lastDoc.length > 0 ? lastDoc[0].id + 1 : 0;
    return await brands.create({
      id: id,
      name: brandName,
    });
  }
  async updateBrand(update) {
    return await brands.updateOne({ id: this.id }, { $set: { ...update } });
  }
  async deleteBrand() {
    return await brands.deleteOne({ id: this.id });
  }
}

class BrandAsset {
  constructor(brandId) {
    this.id = brandId;
  }
  async getBrandAssets() {
    return await brandAssets.find({ brandId: this.id });
  }
  async createBrandAssets(asset) {
    debugLog("Asset=> " + asset.url);
    let doc = await brandAssets.create({
      brandId: this.id,
      name: asset.name,
      url: asset.url,
    });
    return { url: doc.url, name: doc.name, _id: doc._id };
  }
  //   async updateBrandAsset(update) {
  //     return await brands.updateOne({ id: this.id }, { $set: { ...update } });
  //   }
  async deleteBrandAsset() {
    return await brandAssets.deleteOne({ _id: this.id });
  }
}
class BrandColors {
  constructor(brandId) {
    this.id = brandId;
  }
  async getBrandColors() {
    let res = await brandColors.find({ brandId: this.id }).sort({ _id: -1 });
    // debugLog(res);
    return res;
  }
  async createBrandColors(file) {
    let colors = await extractor(file);
    debugLog(colors);
    for (let i = 0; i < colors.length; i++) {
      let existingCheck = await brandColors.findOne({
        brandId: this.id,
        color: colors[i],
      });
      if (existingCheck === null) {
        let res = await brandColors.create({
          color: colors[i],
          brandId: this.id,
        });
      }
    }
  }
  async deleteBrandColor(color) {
    return await brandColors.deleteOne({ brandId: this.id, color: color });
  }
}

class Plan {
  constructor(id) {
    this.id = id;
  }
  async getPlan() {
    return await plans.findOne({ id: this.id });
  }
  async createPlan(planName, planDescription, price, validity) {
    const lastDoc = await plans.find().sort({ id: -1 }).limit(1);
    let id = lastDoc.length > 0 ? lastDoc[0].id + 1 : 0;
    // console.log(`last ID => ${id}`);
    return await plans.create({
      id: id,
      planName: planName,
      planDescription: planDescription,
      price: price,
      validity: validity,
    });
  }
  async updatePlan(update) {
    return await plans.updateOne({ id: this.id }, { $set: { ...update } });
  }
  async deletePlan() {
    return await plans.deleteOne({ id: this.id });
  }
}

module.exports = { Template, Brand, BrandAsset, Plan, BrandColors };
// exports.Brand = Brand;
// exports.BrandAsset = BrandAsset;
// exports.Plan = Plan;
