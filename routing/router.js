let router = require("express").Router();
const { login, signup } = require("../controller/mainController");
const jwt = require("jsonwebtoken");
const {
  createTemplate,
  getTemplate,
  updateTemplate,
  deleteTemplate,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  createBrandAsset,
  getBrandAsset,
  deleteBrandAsset,
  createPlan,
  getPlan,
  updatePlan,
  deletePlan,
  getGlobalTemplates,
  getBrandColors,
} = require("../controller/assets");
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(400).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(400).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(400).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}
postRequests = [
  { path: "/login", controller: login },
  { path: "/signup", controller: signup },
  { path: "/template", controller: createTemplate, verify: true },
  { path: "/brand/:userId", controller: createBrand, verify: true },
  { path: "/assets/:brandId", controller: createBrandAsset, verify: true },
  { path: "/plan", controller: createPlan, verify: true },
];
getRequests = [
  { path: "/template/:id", controller: getTemplate, verify: true },
  { path: "/brand/:brandId", controller: getBrand, verify: true },
  { path: "/assets/:brandId", controller: getBrandAsset, verify: true },
  { path: "/colors/:brandId", controller: getBrandColors, verify: true },
  { path: "/plan/:id", controller: getPlan, verify: true },
  { path: "/global-templates", controller: getGlobalTemplates, verify: true },
];
updateRequests = [
  { path: "/template/:id", controller: updateTemplate, verify: true },
  { path: "/brand/:id", controller: updateBrand, verify: true },
  { path: "/plan/:id", controller: updatePlan, verify: true },
];
deleteRequests = [
  { path: "/template/:id", controller: deleteTemplate, verify: true },
  { path: "/brand/:id", controller: deleteBrand, verify: true },
  { path: "/assets/:id", controller: deleteBrandAsset, verify: true },
  { path: "/plan/:id", controller: deletePlan, verify: true },
];
//create post routes
postRequests.map((item) =>
  router.post(
    item.path,
    (req, res, next) => (item.verify ? verifyToken(req, res, next) : next()),
    item.controller
  )
);

// console.log(postRequests);

//create get routes
getRequests.map((item) =>
  router.get(
    item.path,
    (req, res, next) => (item.verify ? verifyToken(req, res, next) : next()),
    item.controller
  )
);

//create update routes
updateRequests.map((item) =>
  router.put(
    item.path,
    (req, res, next) => (item.verify ? verifyToken(req, res, next) : next()),
    item.controller
  )
);

//create delete routes
deleteRequests.map((item) =>
  router.delete(
    item.path,
    (req, res, next) => (item.verify ? verifyToken(req, res, next) : next()),
    item.controller
  )
);
router.all("*", (req, res) =>
  res.status(404).json({
    message: "invalid request",
  })
);

module.exports = router;
