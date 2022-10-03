const {
  Template,
  Brand,
  BrandAsset,
  Plan,
  BrandColors,
} = require("./assetUtities");
const allTemplates = require("./templates");
const { uploadToTelegraph } = require("../utilities/manageResources");
const debugLog = require("../logging/debugLogger");
/*
=========[ TEMPLATES ]===========
*/
exports.getGlobalTemplates = async (req, res, next) => {
  try {
    res.status(200).json({
      message: allTemplates,
    });
  } catch (error) {
    next(error);
  }
};
exports.createTemplate = async (req, res, next) => {
  try {
    template = new Template();
    const { sociamedia, width, height, colors, html } = req.body;
    res.status(200).json({
      message: await template.createTemplate(
        sociamedia,
        width,
        height,
        colors,
        html
      ),
    });
  } catch (error) {
    next(error);
  }
};

exports.getTemplate = async (req, res, next) => {
  try {
    const id = req.params.id;
    template = new Template(id);
    res.status(200).json({
      message: await template.getTemplate(),
    });
  } catch (error) {
    next(error);
  }
};
exports.updateTemplate = async (req, res, next) => {
  try {
    const id = req.params.id;
    template = new Template(id);
    res.status(200).json({
      message: await template.updateTemplate(req.body),
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteTemplate = async (req, res, next) => {
  try {
    const id = req.params.id;
    template = new Template(id);
    res.status(200).json({
      message: await template.deleteTemplate(),
    });
  } catch (error) {
    next(error);
  }
};

/*
=========[ BRAND ]===========
*/
exports.createBrand = async (req, res, next) => {
  try {
    brand = new Brand();
    const { name } = req.body;
    res.status(200).json({
      message: await brand.createBrand(name),
    });
  } catch (error) {
    next(error);
  }
};

exports.getBrand = async (req, res, next) => {
  try {
    const id = req.params.brandId;
    brand = new Brand(id);
    res.status(200).json({
      message: await brand.getBrand(),
    });
  } catch (error) {
    next(error);
  }
};
exports.updateBrand = async (req, res, next) => {
  try {
    const id = req.params.id;
    brand = new Brand();
    res.status(200).json({
      message: await brand.updateBrand(req.body),
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteBrand = async (req, res, next) => {
  try {
    const id = req.params.id;
    brand = new Brand(id);
    res.status(200).json({
      message: await brand.deleteBrand(),
    });
  } catch (error) {
    next(error);
  }
};
/*
=========[ ASSET ]===========
*/
exports.createBrandAsset = async (req, res, next) => {
  try {
    brandId = req.params.brandId;
    let files = req.files.filename.length
      ? req.files.filename
      : [req.files.filename];
    let brand = new BrandAsset(brandId);
    let colors = new BrandColors(brandId);
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let upRes = await uploadToTelegraph(file.data);
      let result = await brand.createBrandAssets({
        ...upRes,
        name: file.name,
      });
      res.status(200).json({
        message: result,
      });
      await colors.createBrandColors(file.data);
    }
  } catch (errr) {
    let err = new Error("Upload Failed");
    next(err);
  }
};

exports.getBrandAsset = async (req, res, next) => {
  try {
    const id = req.params.brandId;
    let brand = new BrandAsset(id);
    let result = await brand.getBrandAssets();
    debugLog("Total Brand Assets => " + result.length);
    res.status(200).json({
      message: result,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteBrandAsset = async (req, res, next) => {
  try {
    const id = req.params.id;
    brand = new BrandAsset(id);
    debugLog("Delete Asset", id);
    res.status(200).json({
      message: await brand.deleteBrandAsset(),
    });
  } catch (error) {
    next(error);
  }
};
/*
=========[ PLAN ]===========
*/
exports.createPlan = async (req, res, next) => {
  try {
    plan = new Plan();
    const { planName, planDescription, price, validity } = req.body;
    res.status(200).json({
      message: await plan.createPlan(
        planName,
        planDescription,
        price,
        validity
      ),
    });
  } catch (error) {
    next(error);
  }
};

exports.getPlan = async (req, res, next) => {
  try {
    const id = req.params.id;
    plan = new Plan(id);
    res.status(200).json({
      message: await plan.getPlan(),
    });
  } catch (error) {
    next(error);
  }
};
exports.updatePlan = async (req, res, next) => {
  try {
    const id = req.params.id;
    plan = new Plan();
    res.status(200).json({
      message: await plan.updatePlan(req.body),
    });
  } catch (error) {
    next(error);
  }
};
exports.deletePlan = async (req, res, next) => {
  try {
    const id = req.params.id;
    plan = new Plan(id);
    res.status(200).json({
      message: await plan.deletePlan(),
    });
  } catch (error) {
    next(error);
  }
};
/*
=========[ COLORS ]===========
*/

exports.getBrandColors = async (req, res, next) => {
  try {
    const brandId = req.params.brandId;
    colors = new BrandColors(brandId);
    resu = await colors.getBrandColors();
    res.status(200).json({
      message: resu,
    });
  } catch (error) {
    next(error);
  }
};
